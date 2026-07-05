const crypto = require("crypto");
const express = require("express");
const { COLLECTIONS } = require("../config");
const adminAuth = require("../middleware/adminAuth");
const teamUpload = require("../middleware/teamUpload");
const cloudinary = require("../lib/cloudinary");
const { readJsonArray, writeJsonArray } = require("../storage/jsonStore");

const router = express.Router();

router.get("/team", async (_req, res) => {
  const team = await readJsonArray(COLLECTIONS.team);
  return res.status(200).json({ status: "success", data: team });
});

router.post("/team", adminAuth, teamUpload.single("photo"), async (req, res) => {
  try {
    const { name, role, description, email, phone } = req.body;

    if (!name || !role) {
      return res.status(400).json({
        status: "error",
        message: "Name and role are required.",
      });
    }

    if (!req.file) {
      return res.status(400).json({
        status: "error",
        message: "A photo is required.",
      });
    }

    const team = await readJsonArray(COLLECTIONS.team);
    const now = new Date().toISOString();

    const member = {
      id: crypto.randomUUID(),
      name,
      role,
      description: description || "",
      email: email || "",
      phone: phone || "",
      image: req.file.path,
      imagePublicId: req.file.filename,
      createdAt: now,
      updatedAt: now,
    };

    team.push(member);
    await writeJsonArray(COLLECTIONS.team, team);

    return res.status(201).json({ status: "success", data: member });
  } catch (error) {
    console.error("Create team member error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while creating team member.",
    });
  }
});

router.put("/team/:id", adminAuth, teamUpload.single("photo"), async (req, res) => {
  try {
    const { name, role, description, email, phone } = req.body;
    const team = await readJsonArray(COLLECTIONS.team);
    const index = team.findIndex((member) => member.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    const existing = team[index];
    const updated = {
      ...existing,
      name: name ?? existing.name,
      role: role ?? existing.role,
      description: description ?? existing.description,
      email: email ?? existing.email,
      phone: phone ?? existing.phone,
      updatedAt: new Date().toISOString(),
    };

    if (req.file) {
      updated.image = req.file.path;
      updated.imagePublicId = req.file.filename;
      await deleteTeamPhoto(existing.imagePublicId);
    }

    team[index] = updated;
    await writeJsonArray(COLLECTIONS.team, team);

    return res.status(200).json({ status: "success", data: updated });
  } catch (error) {
    console.error("Update team member error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while updating team member.",
    });
  }
});

router.delete("/team/:id", adminAuth, async (req, res) => {
  try {
    const team = await readJsonArray(COLLECTIONS.team);
    const index = team.findIndex((member) => member.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    const [removed] = team.splice(index, 1);
    await writeJsonArray(COLLECTIONS.team, team);
    await deleteTeamPhoto(removed.imagePublicId);

    return res.status(200).json({ status: "success", data: team });
  } catch (error) {
    console.error("Delete team member error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while deleting team member.",
    });
  }
});

router.patch("/team/:id/move", adminAuth, async (req, res) => {
  try {
    const { direction } = req.body;
    if (direction !== "up" && direction !== "down") {
      return res.status(400).json({
        status: "error",
        message: "Direction must be 'up' or 'down'.",
      });
    }

    const team = await readJsonArray(COLLECTIONS.team);
    const index = team.findIndex((member) => member.id === req.params.id);

    if (index === -1) {
      return res.status(404).json({
        status: "error",
        message: "Team member not found.",
      });
    }

    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= team.length) {
      return res.status(200).json({ status: "success", data: team });
    }

    [team[index], team[targetIndex]] = [team[targetIndex], team[index]];
    await writeJsonArray(COLLECTIONS.team, team);

    return res.status(200).json({ status: "success", data: team });
  } catch (error) {
    console.error("Reorder team member error:", error);
    return res.status(500).json({
      status: "error",
      message: "Internal server error while reordering team.",
    });
  }
});

async function deleteTeamPhoto(publicId) {
  if (!publicId) return;
  await cloudinary.uploader.destroy(publicId).catch(() => {});
}

module.exports = router;

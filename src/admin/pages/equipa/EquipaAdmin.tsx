import { FormEvent, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2, X } from "lucide-react";
import AdminLayout from "../../AdminLayout";
import { API_BASE, adminFetch, resolveUploadedImage } from "../../lib/api";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description: string;
  email: string;
  phone: string;
  image: string;
  createdAt: string;
  updatedAt: string;
};

type FormState = {
  name: string;
  role: string;
  description: string;
  email: string;
  phone: string;
};

const EMPTY_FORM: FormState = {
  name: "",
  role: "",
  description: "",
  email: "",
  phone: "",
};

export default function EquipaAdmin() {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const loadMembers = async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await fetch(`${API_BASE}/api/team`);
      const body = await res.json();
      if (!res.ok) throw new Error(body?.message || "Failed to load team.");
      setMembers(body.data as TeamMember[]);
    } catch (error) {
      setLoadError(
        error instanceof Error ? error.message : "Failed to load team."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  const openCreateForm = () => {
    setEditingId(null);
    setForm(EMPTY_FORM);
    setPhoto(null);
    setFormError("");
    setFormOpen(true);
  };

  const openEditForm = (member: TeamMember) => {
    setEditingId(member.id);
    setForm({
      name: member.name,
      role: member.role,
      description: member.description,
      email: member.email,
      phone: member.phone,
    });
    setPhoto(null);
    setFormError("");
    setFormOpen(true);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError("");

    if (!editingId && !photo) {
      setFormError("A foto é obrigatória.");
      return;
    }

    const body = new FormData();
    body.append("name", form.name);
    body.append("role", form.role);
    body.append("description", form.description);
    body.append("email", form.email);
    body.append("phone", form.phone);
    if (photo) body.append("photo", photo);

    setSubmitting(true);
    try {
      await adminFetch(editingId ? `/api/team/${editingId}` : "/api/team", {
        method: editingId ? "PUT" : "POST",
        body,
      });
      setFormOpen(false);
      await loadMembers();
    } catch (error) {
      setFormError(
        error instanceof Error ? error.message : "Erro ao guardar."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (member: TeamMember) => {
    if (!window.confirm(`Remover ${member.name} da equipa?`)) return;

    try {
      await adminFetch(`/api/team/${member.id}`, { method: "DELETE" });
      await loadMembers();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao remover.");
    }
  };

  const handleMove = async (member: TeamMember, direction: "up" | "down") => {
    try {
      await adminFetch(`/api/team/${member.id}/move`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ direction }),
      });
      await loadMembers();
    } catch (error) {
      alert(error instanceof Error ? error.message : "Erro ao reordenar.");
    }
  };

  return (
    <AdminLayout>
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-blue-900">Equipa</h1>
          <button
            onClick={openCreateForm}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Adicionar Membro
          </button>
        </div>

        {loadError && (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
            {loadError}
          </p>
        )}

        {loading ? (
          <p className="text-gray-500">A carregar...</p>
        ) : members.length === 0 ? (
          <p className="text-gray-500">Ainda não há membros na equipa.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {members.map((member, index) => (
              <div
                key={member.id}
                className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm"
              >
                <div className="relative h-48 w-full bg-gray-100">
                  <Image
                    src={resolveUploadedImage(member.image)}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <h2 className="font-bold text-blue-900">{member.name}</h2>
                  <p className="text-sm text-gray-600">{member.role}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-gray-500">
                    {member.description}
                  </p>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-1">
                      <button
                        onClick={() => handleMove(member, "up")}
                        disabled={index === 0}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                        aria-label="Mover para cima"
                      >
                        <ArrowUp className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleMove(member, "down")}
                        disabled={index === members.length - 1}
                        className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 disabled:opacity-30"
                        aria-label="Mover para baixo"
                      >
                        <ArrowDown className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="flex gap-1">
                      <button
                        onClick={() => openEditForm(member)}
                        className="rounded-md p-1.5 text-blue-700 hover:bg-blue-50"
                        aria-label="Editar"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(member)}
                        className="rounded-md p-1.5 text-red-600 hover:bg-red-50"
                        aria-label="Remover"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
            <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold text-blue-900">
                  {editingId ? "Editar Membro" : "Adicionar Membro"}
                </h2>
                <button
                  onClick={() => setFormOpen(false)}
                  className="text-gray-400 hover:text-gray-600"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Nome
                  </label>
                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({ ...form, name: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Função
                  </label>
                  <input
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm({ ...form, role: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Descrição
                  </label>
                  <textarea
                    rows={3}
                    value={form.description}
                    onChange={(e) =>
                      setForm({ ...form, description: e.target.value })
                    }
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-sm font-medium text-gray-700">
                      Telefone
                    </label>
                    <input
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700">
                    Foto {editingId ? "(deixe em branco para manter a actual)" : ""}
                  </label>
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => setPhoto(e.target.files?.[0] ?? null)}
                    className="w-full text-sm"
                  />
                </div>

                {formError && (
                  <p className="text-sm text-red-600">{formError}</p>
                )}

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setFormOpen(false)}
                    className="rounded-lg px-4 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800 disabled:opacity-50"
                  >
                    {submitting ? "A guardar..." : "Guardar"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}

import { FormEvent, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import {
  ArrowDown,
  ArrowUp,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Filter,
  Pencil,
  Plus,
  Search,
  Trash2,
  Users,
  X,
  MapPin,
  Phone,
  CircleUserRound,
} from "lucide-react";
import AdminLayout from "../../AdminLayout";
import { API_BASE, adminFetch, resolveUploadedImage } from "../../lib/api";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  description?: string;
  email?: string;
  phone?: string;
  image: string;
  createdAt?: string;
  updatedAt?: string;
};

type FormState = {
  name: string;
  role: string;
};

type Student = {
  id: number;
  name: string;
  surname: string;
  phone: string;
  age: number;
  belt: string;
  location: string;
  active: boolean;
};

const EMPTY_FORM: FormState = {
  name: "",
  role: "",
};

/* -------------------------------------------------------------------------- */
/* TEAM                                                                       */
/* -------------------------------------------------------------------------- */

const FALLBACK_TEAM: TeamMember[] = [
  {
    id: "team-1",
    name: "Edson Madeira OLY",
    role: "Fundador e Professor",
    image: "/edson.jpeg",
  },
  {
    id: "team-2",
    name: "Antonio Muhai",
    role: "Monitor de Judo",
    image: "/antonio.jpeg",
  },
  {
    id: "team-3",
    name: "Kevin Loforte OLY",
    role: "Professor de Judo",
    image: "/kevin.jpeg",
  },
  {
    id: "team-4",
    name: "Marcelino Manjate",
    role: "Professor de Judo",
    image: "/marcelino.jpeg",
  },
  {
    id: "team-5",
    name: "Ayton Siquir",
    role: "Professor de Judo",
    image: "/ayton.jpeg",
  },
  {
    id: "team-6",
    name: "Nicolau Boudou",
    role: "Professor de Judo",
    image: "/nicolau.jpeg",
  },
  {
    id: "team-7",
    name: "Mariano Cassiano",
    role: "Monitor de Judo",
    image: "/mariano.jpeg",
  },
];

/* -------------------------------------------------------------------------- */
/* LOCATIONS                                                                  */
/* -------------------------------------------------------------------------- */

const LOCATIONS = [
  "Clube Naval de Maputo",
  "Escola Primária Filipe Samuel Magaia",
  "Escola Portuguesa de Moçambique",
  "Escola Americana de Moçambique",
  "Colégio Arco-Íris",
  "Canadian Montessori Academy",
  "Casa Colorida",
  "Viva Melhor",
  "Mafalala",
  "Vila Nova",
];

/* -------------------------------------------------------------------------- */
/* BELTS                                                                      */
/* -------------------------------------------------------------------------- */

const BELTS = [
  "Branca",
  "Amarela",
  "Laranja",
  "Verde",
  "Azul",
  "Castanha",
  "Preta",
];

/* -------------------------------------------------------------------------- */
/* MOCK STUDENTS — 100+                                                       */
/* -------------------------------------------------------------------------- */

const FIRST_NAMES = [
  "Afonso",
  "Alberto",
  "Alex",
  "Alexandre",
  "Amélia",
  "André",
  "António",
  "Armando",
  "Aurélio",
  "Benedito",
  "Bruno",
  "Carlos",
  "Celso",
  "Cláudia",
  "Daniel",
  "Dário",
  "David",
  "Domingos",
  "Edgar",
  "Edson",
  "Elisa",
  "Emanuel",
  "Ernesto",
  "Fábio",
  "Fátima",
  "Feliciano",
  "Fernando",
  "Francisco",
  "Gabriel",
  "Gerson",
  "Gilberto",
  "Guilherme",
  "Hélder",
  "Henrique",
  "Inês",
  "Isabel",
  "Ivan",
  "Jaime",
  "Jéssica",
  "João",
  "Jorge",
  "José",
  "Júlia",
  "Kevin",
  "Leandro",
  "Leonardo",
  "Lídia",
  "Lourenço",
  "Lucas",
  "Manuel",
  "Marcelo",
  "Marcos",
  "Maria",
  "Mariana",
  "Mário",
  "Mateus",
  "Matilde",
  "Miguel",
  "Milton",
  "Moisés",
  "Nelson",
  "Nicolau",
  "Nilton",
  "Nuno",
  "Olga",
  "Orlando",
  "Paulo",
  "Pedro",
  "Rafael",
  "Raquel",
  "Ricardo",
  "Roberto",
  "Rúben",
  "Samuel",
  "Sandra",
  "Sérgio",
  "Silvia",
  "Simão",
  "Sofia",
  "Tomás",
  "Valter",
  "Vasco",
  "Vicente",
  "Wilson",
  "Yasmin",
];

const SURNAMES = [
  "Alberto",
  "Amaral",
  "Bila",
  "Boudou",
  "Cassiano",
  "Chivambo",
  "Cossa",
  "Cuamba",
  "Dinis",
  "Fernandes",
  "Ferreira",
  "Francisco",
  "Gomes",
  "Jorge",
  "Langa",
  "Loforte",
  "Machava",
  "Madeira",
  "Magaia",
  "Manjate",
  "Matsinhe",
  "Mavume",
  "Mondlane",
  "Muchanga",
  "Muhai",
  "Mussa",
  "Nhantumbo",
  "Nhampossa",
  "Pereira",
  "Santos",
  "Siquir",
  "Soares",
  "Tembe",
  "Tivane",
  "Tomás",
  "Zandamela",
];

function generateMockStudents(): Student[] {
  return Array.from({ length: 120 }, (_, index) => {
    const firstName = FIRST_NAMES[index % FIRST_NAMES.length];
    const surname =
      SURNAMES[(index * 7) % SURNAMES.length];

    const age = 6 + ((index * 3) % 31);

    const belt =
      BELTS[
        Math.floor(index / 4) % BELTS.length
      ];

    const location =
      LOCATIONS[index % LOCATIONS.length];

    const active = index % 7 !== 0 && index % 11 !== 0;

    const phoneNumber = String(
      840000000 + ((index * 731) % 9999999)
    ).padStart(9, "0");

    return {
      id: index + 1,
      name: firstName,
      surname,
      phone: `+258 ${phoneNumber.slice(
        0,
        2
      )} ${phoneNumber.slice(2, 5)} ${phoneNumber.slice(5)}`,
      age,
      belt,
      location,
      active,
    };
  });
}

const MOCK_STUDENTS = generateMockStudents();

/* -------------------------------------------------------------------------- */
/* MAIN COMPONENT                                                             */
/* -------------------------------------------------------------------------- */

export default function EquipaAdmin() {
  const [members, setMembers] =
    useState<TeamMember[]>(FALLBACK_TEAM);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");

  const [formOpen, setFormOpen] = useState(false);
  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [form, setForm] =
    useState<FormState>(EMPTY_FORM);

  const [photo, setPhoto] =
    useState<File | null>(null);

  const [submitting, setSubmitting] =
    useState(false);

  const [formError, setFormError] =
    useState("");

  /* ------------------------------------------------------------------------ */
  /* STUDENTS                                                                 */
  /* ------------------------------------------------------------------------ */

  const [students] =
    useState<Student[]>(MOCK_STUDENTS);

  const [studentSearch, setStudentSearch] =
    useState("");

  const [locationFilter, setLocationFilter] =
    useState("Todas");

  const [beltFilter, setBeltFilter] =
    useState("Todos");

  const [statusFilter, setStatusFilter] =
    useState("Todos");

  const [ageFilter, setAgeFilter] =
    useState("Todas");

  const [currentPage, setCurrentPage] =
    useState(1);

  const studentsPerPage = 12;

  /* ------------------------------------------------------------------------ */
  /* LOAD TEAM                                                                */
  /* ------------------------------------------------------------------------ */

  const loadMembers = async () => {
    setLoading(true);
    setLoadError("");

    try {
      const res = await fetch(`${API_BASE}/api/team`);
      const body = await res.json();

      if (!res.ok) {
        throw new Error(
          body?.message || "Falha ao carregar a equipa."
        );
      }

      if (Array.isArray(body?.data) && body.data.length > 0) {
        setMembers(body.data as TeamMember[]);
      } else {
        setMembers(FALLBACK_TEAM);
      }
    } catch (error) {
      setMembers(FALLBACK_TEAM);

      setLoadError(
        error instanceof Error
          ? error.message
          : "Falha ao carregar a equipa."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMembers();
  }, []);

  /* ------------------------------------------------------------------------ */
  /* TEAM ACTIONS                                                             */
  /* ------------------------------------------------------------------------ */

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
    });

    setPhoto(null);
    setFormError("");
    setFormOpen(true);
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setFormError("");

    if (!editingId && !photo) {
      setFormError("A foto é obrigatória.");
      return;
    }

    const body = new FormData();

    body.append("name", form.name);
    body.append("role", form.role);

    // These fields are kept empty for backwards compatibility
    // with the existing API.
    body.append("description", "");
    body.append("email", "");
    body.append("phone", "");

    if (photo) {
      body.append("photo", photo);
    }

    setSubmitting(true);

    try {
      await adminFetch(
        editingId
          ? `/api/team/${editingId}`
          : "/api/team",
        {
          method: editingId ? "PUT" : "POST",
          body,
        }
      );

      setFormOpen(false);
      await loadMembers();
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "Erro ao guardar."
      );
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (
    member: TeamMember
  ) => {
    if (
      !window.confirm(
        `Remover ${member.name} da equipa?`
      )
    ) {
      return;
    }

    try {
      await adminFetch(
        `/api/team/${member.id}`,
        {
          method: "DELETE",
        }
      );

      await loadMembers();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao remover."
      );
    }
  };

  const handleMove = async (
    member: TeamMember,
    direction: "up" | "down"
  ) => {
    try {
      await adminFetch(
        `/api/team/${member.id}/move`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            direction,
          }),
        }
      );

      await loadMembers();
    } catch (error) {
      alert(
        error instanceof Error
          ? error.message
          : "Erro ao reordenar."
      );
    }
  };

  /* ------------------------------------------------------------------------ */
  /* STUDENT FILTERING                                                        */
  /* ------------------------------------------------------------------------ */

  const filteredStudents = useMemo(() => {
    const query =
      studentSearch.trim().toLowerCase();

    return students.filter((student) => {
      const matchesSearch =
        !query ||
        `${student.name} ${student.surname}`
          .toLowerCase()
          .includes(query) ||
        student.phone
          .toLowerCase()
          .includes(query);

      const matchesLocation =
        locationFilter === "Todas" ||
        student.location === locationFilter;

      const matchesBelt =
        beltFilter === "Todos" ||
        student.belt === beltFilter;

      const matchesStatus =
        statusFilter === "Todos" ||
        (statusFilter === "Activos"
          ? student.active
          : !student.active);

      const matchesAge =
        ageFilter === "Todas" ||
        (ageFilter === "Crianças" &&
          student.age <= 12) ||
        (ageFilter === "Jovens" &&
          student.age >= 13 &&
          student.age <= 17) ||
        (ageFilter === "Adultos" &&
          student.age >= 18);

      return (
        matchesSearch &&
        matchesLocation &&
        matchesBelt &&
        matchesStatus &&
        matchesAge
      );
    });
  }, [
    students,
    studentSearch,
    locationFilter,
    beltFilter,
    statusFilter,
    ageFilter,
  ]);

  const totalPages = Math.max(
    1,
    Math.ceil(
      filteredStudents.length /
        studentsPerPage
    )
  );

  const safeCurrentPage = Math.min(
    currentPage,
    totalPages
  );

  const paginatedStudents =
    filteredStudents.slice(
      (safeCurrentPage - 1) *
        studentsPerPage,
      safeCurrentPage *
        studentsPerPage
    );

  useEffect(() => {
    setCurrentPage(1);
  }, [
    studentSearch,
    locationFilter,
    beltFilter,
    statusFilter,
    ageFilter,
  ]);

  /* ------------------------------------------------------------------------ */
  /* STATISTICS                                                               */
  /* ------------------------------------------------------------------------ */

  const activeStudents = students.filter(
    (student) => student.active
  ).length;

  const inactiveStudents =
    students.length - activeStudents;

  const childrenCount = students.filter(
    (student) => student.age <= 12
  ).length;

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                   */
  /* ------------------------------------------------------------------------ */

  return (
    <AdminLayout>
      <div className="mx-auto max-w-7xl space-y-10 pb-16">
        {/* ------------------------------------------------------------------ */}
        {/* HEADER                                                             */}
        {/* ------------------------------------------------------------------ */}

        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="mb-1 text-sm font-semibold uppercase tracking-wider text-blue-600">
              Gestão do Clube
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Equipa & Alunos
            </h1>

            <p className="mt-1 text-sm text-gray-500">
              Gerencie professores, monitores e
              alunos registados.
            </p>
          </div>

          <button
            onClick={openCreateForm}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Adicionar membro
          </button>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* OVERVIEW CARDS                                                     */}
        {/* ------------------------------------------------------------------ */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Membros da equipa
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {members.length}
                </p>
              </div>

              <div className="rounded-xl bg-blue-50 p-3 text-blue-700">
                <CircleUserRound className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Total de alunos
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {students.length}
                </p>
              </div>

              <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Alunos activos
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {activeStudents}
                </p>
              </div>

              <div className="rounded-xl bg-green-50 p-3 text-green-700">
                <CheckCircle2 className="h-6 w-6" />
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">
                  Crianças
                </p>
                <p className="mt-1 text-3xl font-bold text-gray-900">
                  {childrenCount}
                </p>
              </div>

              <div className="rounded-xl bg-orange-50 p-3 text-orange-700">
                <Users className="h-6 w-6" />
              </div>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------ */}
        {/* TEAM                                                               */}
        {/* ------------------------------------------------------------------ */}

        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">
                Professores & Monitores
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Equipa responsável pelo ensino e
                acompanhamento dos atletas.
              </p>
            </div>
          </div>

          {loadError && (
            <div className="mb-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-700">
              Não foi possível carregar a equipa
              através da API. A mostrar os dados
              predefinidos.
            </div>
          )}

          {loading ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 7 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="h-80 animate-pulse rounded-2xl bg-gray-100"
                  />
                )
              )}
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {members.map((member, index) => (
                <div
                  key={member.id}
                  className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                    <Image
                      src={resolveUploadedImage(
                        member.image
                      )}
                      alt={member.name}
                      fill
                      sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>

                  <div className="p-4">
                    <h3 className="font-bold text-gray-900">
                      {member.name}
                    </h3>

                    <p className="mt-1 text-sm font-medium text-blue-700">
                      {member.role}
                    </p>

                    <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3">
                      <div className="flex gap-1">
                        <button
                          onClick={() =>
                            handleMove(
                              member,
                              "up"
                            )
                          }
                          disabled={index === 0}
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-25"
                          aria-label="Mover para cima"
                        >
                          <ArrowUp className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleMove(
                              member,
                              "down"
                            )
                          }
                          disabled={
                            index ===
                            members.length - 1
                          }
                          className="rounded-lg p-2 text-gray-500 transition hover:bg-gray-100 disabled:opacity-25"
                          aria-label="Mover para baixo"
                        >
                          <ArrowDown className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex gap-1">
                        <button
                          onClick={() =>
                            openEditForm(
                              member
                            )
                          }
                          className="rounded-lg p-2 text-blue-700 transition hover:bg-blue-50"
                          aria-label="Editar"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              member
                            )
                          }
                          className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
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
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* STUDENTS                                                           */}
        {/* ------------------------------------------------------------------ */}

        <section>
          <div className="mb-5">
            <h2 className="text-xl font-bold text-gray-900">
              Alunos Registados
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Lista de alunos actualmente registados
              nas diferentes localizações.
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">
            {/* FILTERS */}
            <div className="border-b border-gray-100 bg-gray-50/70 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-500" />

                <span className="text-sm font-semibold text-gray-700">
                  Filtros
                </span>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
                {/* Search */}
                <div className="relative lg:col-span-1">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                  <input
                    value={studentSearch}
                    onChange={(e) =>
                      setStudentSearch(
                        e.target.value
                      )
                    }
                    placeholder="Pesquisar aluno..."
                    className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-9 pr-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                {/* Location */}
                <select
                  value={locationFilter}
                  onChange={(e) =>
                    setLocationFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Todas">
                    Todas as localizações
                  </option>

                  {LOCATIONS.map((location) => (
                    <option
                      key={location}
                      value={location}
                    >
                      {location}
                    </option>
                  ))}
                </select>

                {/* Belt */}
                <select
                  value={beltFilter}
                  onChange={(e) =>
                    setBeltFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Todos">
                    Todos os cinturões
                  </option>

                  {BELTS.map((belt) => (
                    <option
                      key={belt}
                      value={belt}
                    >
                      {belt}
                    </option>
                  ))}
                </select>

                {/* Status */}
                <select
                  value={statusFilter}
                  onChange={(e) =>
                    setStatusFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Todos">
                    Todos os estados
                  </option>
                  <option value="Activos">
                    Activos
                  </option>
                  <option value="Inactivos">
                    Inactivos
                  </option>
                </select>

                {/* Age */}
                <select
                  value={ageFilter}
                  onChange={(e) =>
                    setAgeFilter(
                      e.target.value
                    )
                  }
                  className="rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="Todas">
                    Todas as idades
                  </option>
                  <option value="Crianças">
                    Crianças · 6–12
                  </option>
                  <option value="Jovens">
                    Jovens · 13–17
                  </option>
                  <option value="Adultos">
                    Adultos · 18+
                  </option>
                </select>
              </div>
            </div>

            {/* TABLE */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[950px]">
                <thead>
                  <tr className="border-b border-gray-100 bg-white text-left">
                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Aluno
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Telefone
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Idade
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Cinturão
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Localização
                    </th>

                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Estado
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-50">
                  {paginatedStudents.map(
                    (student) => (
                      <tr
                        key={student.id}
                        className="transition hover:bg-gray-50/80"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-700">
                              {student.name
                                .charAt(0)
                                .toUpperCase()}
                              {student.surname
                                .charAt(0)
                                .toUpperCase()}
                            </div>

                            <div>
                              <p className="font-semibold text-gray-900">
                                {student.name}{" "}
                                {student.surname}
                              </p>

                              <p className="text-xs text-gray-400">
                                #{String(
                                  student.id
                                ).padStart(
                                  3,
                                  "0"
                                )}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Phone className="h-4 w-4 text-gray-400" />
                            {student.phone}
                          </div>
                        </td>

                        <td className="px-5 py-4 text-sm font-medium text-gray-700">
                          {student.age} anos
                        </td>

                        <td className="px-5 py-4">
                          <span className="inline-flex rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-700">
                            {student.belt}
                          </span>
                        </td>

                        <td className="px-5 py-4">
                          <div className="flex max-w-[220px] items-center gap-2 text-sm text-gray-600">
                            <MapPin className="h-4 w-4 shrink-0 text-blue-500" />

                            <span className="truncate">
                              {student.location}
                            </span>
                          </div>
                        </td>

                        <td className="px-5 py-4">
                          {student.active ? (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                              Activo
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold text-gray-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-gray-400" />
                              Inactivo
                            </span>
                          )}
                        </td>
                      </tr>
                    )
                  )}

                  {paginatedStudents.length ===
                    0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-16 text-center"
                      >
                        <Users className="mx-auto h-10 w-10 text-gray-300" />

                        <p className="mt-3 font-semibold text-gray-700">
                          Nenhum aluno encontrado
                        </p>

                        <p className="mt-1 text-sm text-gray-400">
                          Tente alterar os filtros
                          ou a pesquisa.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* PAGINATION */}
            <div className="flex flex-col gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-gray-500">
                A mostrar{" "}
                <span className="font-semibold text-gray-700">
                  {filteredStudents.length ===
                  0
                    ? 0
                    : (safeCurrentPage - 1) *
                        studentsPerPage +
                      1}
                </span>{" "}
                –{" "}
                <span className="font-semibold text-gray-700">
                  {Math.min(
                    safeCurrentPage *
                      studentsPerPage,
                    filteredStudents.length
                  )}
                </span>{" "}
                de{" "}
                <span className="font-semibold text-gray-700">
                  {filteredStudents.length}
                </span>{" "}
                alunos
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.max(
                        1,
                        safeCurrentPage - 1
                      )
                    )
                  }
                  disabled={safeCurrentPage === 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Página anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>

                <span className="min-w-[90px] text-center text-sm font-medium text-gray-600">
                  Página{" "}
                  {safeCurrentPage} de{" "}
                  {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage(
                      Math.min(
                        totalPages,
                        safeCurrentPage + 1
                      )
                    )
                  }
                  disabled={
                    safeCurrentPage ===
                    totalPages
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30"
                  aria-label="Página seguinte"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------------------ */}
        {/* TEAM MODAL                                                         */}
        {/* ------------------------------------------------------------------ */}

        {formOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
              <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    {editingId
                      ? "Editar membro"
                      : "Adicionar membro"}
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Dados apresentados na página
                    pública da equipa.
                  </p>
                </div>

                <button
                  onClick={() =>
                    setFormOpen(false)
                  }
                  className="rounded-lg p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                  aria-label="Fechar"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-5 p-6"
              >
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Nome completo
                  </label>

                  <input
                    required
                    value={form.name}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        name: e.target.value,
                      })
                    }
                    placeholder="Ex.: Edson Madeira OLY"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Função
                  </label>

                  <input
                    required
                    value={form.role}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        role: e.target.value,
                      })
                    }
                    placeholder="Ex.: Professor de Judo"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-gray-700">
                    Fotografia
                    {!editingId && (
                      <span className="ml-1 text-red-500">
                        *
                      </span>
                    )}
                  </label>

                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) =>
                      setPhoto(
                        e.target.files?.[0] ??
                          null
                      )
                    }
                    className="w-full rounded-xl border border-gray-200 px-3 py-3 text-sm"
                  />

                  <p className="mt-1.5 text-xs text-gray-400">
                    JPG, PNG ou WebP.
                    {editingId
                      ? " Deixe vazio para manter a fotografia actual."
                      : ""}
                  </p>
                </div>

                {formError && (
                  <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">
                    {formError}
                  </div>
                )}

                <div className="flex justify-end gap-3 border-t border-gray-100 pt-5">
                  <button
                    type="button"
                    onClick={() =>
                      setFormOpen(false)
                    }
                    className="rounded-xl px-5 py-2.5 text-sm font-semibold text-gray-600 transition hover:bg-gray-100"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {submitting
                      ? "A guardar..."
                      : "Guardar membro"}
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

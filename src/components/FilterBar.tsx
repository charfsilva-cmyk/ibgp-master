type Props = {
  search: string;
  setSearch: (value: string) => void;
  materia: string;
  setMateria: (value: string) => void;
  materias: string[];
};

export default function FilterBar({
  search,
  setSearch,
  materia,
  setMateria,
  materias,
}: Props) {
  return (
    <div className="filter-bar">
      <input
        type="text"
        placeholder="Buscar questão..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={materia}
        onChange={(e) => setMateria(e.target.value)}
      >
        <option value="">Todas as matérias</option>

        {materias.map((m) => (
          <option key={m}>{m}</option>
        ))}
      </select>
    </div>
  );
}
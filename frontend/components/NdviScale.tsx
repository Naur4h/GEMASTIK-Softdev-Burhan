export default function NdviScale() {
  return (
    <div className="mt-4">
      <p className="mb-2 text-center text-xs font-bold uppercase tracking-wide text-forest-dark">
        NDVI
      </p>

      {/* Gradient bar merah → kuning → hijau */}
      <div
        className="h-6 w-full rounded-full"
        style={{
          background:
            "linear-gradient(to right, #B5342A, #D98C3A, #E8D45A, #7FA050, #3E4A2D)",
        }}
      />

      {/* Label angka */}
      <div className="mt-1 flex justify-between text-xs font-semibold text-forest-dark">
        <span>&lt;0.2</span>
        <span>0.2 - 0.5</span>
        <span>&gt;0.6</span>
      </div>

      {/* Label kategori */}
      <div className="mt-1 flex justify-between text-xs text-forest-dark/70">
        <span>Marginal</span>
        <span>Sedang</span>
        <span>Subur</span>
      </div>
    </div>
  );
}
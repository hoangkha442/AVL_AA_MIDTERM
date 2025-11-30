import { useEffect, useMemo, useState } from "react";

type Stage = "count" | "values";

type Props = {
  open: boolean;
  stage: Stage;
  disabled?: boolean;

  count: number;
  onCountChange: (n: number) => void;

  values: string[];
  onValueChange: (idx: number, val: string) => void;

  onBack: () => void;
  onNext: () => void;     // count -> values
  onStart: () => void;    // values -> run
  onClose: () => void;
};

export default function AutoBuildModal({
  open,
  stage,
  disabled,
  count,
  onCountChange,
  values,
  onValueChange,
  onBack,
  onNext,
  onStart,
  onClose,
}: Props) {
  const [localCount, setLocalCount] = useState(String(count));

  useEffect(() => {
    if (open) setLocalCount(String(count));
  }, [open, count]);

  const header = useMemo(() => {
    return stage === "count"
      ? { title: "Hãy nhập N số phần tử của cây", desc: "Nhập n → hệ thống tạo đúng n ô để bạn điền." }
      : { title: `Nhập ${count} số`, desc: "Bấm Start để hệ thống dựng AVL + hiển thị so sánh/rotate từng bước." };
  }, [stage, count]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-90">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />

      <div className="absolute left-1/2 top-1/2 w-[720px] max-w-[94vw] -translate-x-1/2 -translate-y-1/2">
        <div className="rounded-[28px] border border-white/10 bg-[#0B1020]/92 p-5 text-white shadow-[0_30px_100px_rgba(0,0,0,0.85)]">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="text-xs uppercase tracking-widest text-white/60">Auto Build (AVL)</div>
              <div className="text-xl font-extrabold">{header.title}</div>
              <div className="mt-1 text-sm text-white/70">{header.desc}</div>
            </div>

            <button
              onClick={onClose}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-bold hover:bg-white/10"
            >
              ✕
            </button>
          </div>

          {stage === "count" ? (
            <div className="mt-6 space-y-2">
              <label className="text-sm font-semibold text-white/85">Số lượng n</label>
              <input
                value={localCount}
                onChange={(e) => setLocalCount(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    const n = Math.max(1, Math.min(50, Number(localCount)));
                    if (!Number.isFinite(n)) return;
                    onCountChange(n);
                    onNext();
                  }
                }}
                disabled={disabled}
                placeholder="VD: 7"
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-white/40 focus:border-[#D4AF37]/60 disabled:opacity-60"
              />

              <div className="mt-5 flex gap-2">
                <button
                  onClick={() => {
                    const n = Math.max(1, Math.min(50, Number(localCount)));
                    if (!Number.isFinite(n)) return;
                    onCountChange(n);
                    onNext();
                  }}
                  disabled={disabled}
                  className="flex-1 rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-extrabold text-black hover:brightness-110 disabled:opacity-60"
                >
                  Tiếp tục
                </button>
                <button
                  onClick={onClose}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold hover:bg-white/10"
                >
                  Cancel
                </button>
              </div>

              <div className="mt-2 text-xs text-white/55">
                Giới hạn n: 1 → 50
              </div>
            </div>
          ) : (
            <div className="mt-6">
              <div className="max-h-[55vh] overflow-auto rounded-2xl border border-white/10 bg-white/5 p-3">
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {values.map((v, idx) => (
                    <div key={idx} className="rounded-2xl border border-white/10 bg-[#0C1426] p-3">
                      <div className="text-[11px] font-extrabold text-white/70">#{idx + 1}</div>
                      <input
                        value={v}
                        onChange={(e) => onValueChange(idx, e.target.value)}
                        disabled={disabled}
                        placeholder="VD: 30"
                        className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/35 focus:border-[#D4AF37]/60 disabled:opacity-60"
                      />
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <button
                  onClick={onBack}
                  disabled={disabled}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold hover:bg-white/10 disabled:opacity-60"
                >
                  ← Quay lại
                </button>

                <button
                  onClick={onStart}
                  disabled={disabled}
                  className="flex-1 rounded-2xl bg-[#D4AF37] px-4 py-3 text-sm font-extrabold text-black hover:brightness-110 disabled:opacity-60"
                >
                  Start (Build AVL)
                </button>
              </div>

              <div className="mt-2 text-xs text-white/55">
                Tip: số trùng vẫn nhập được, engine sẽ show step “Trùng mã → bỏ qua”.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

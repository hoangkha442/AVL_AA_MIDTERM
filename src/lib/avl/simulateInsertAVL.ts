import type { AvlNode, Student, TutorStep } from "./types";
import { recomputeHeights, getBF } from "./height";
import { simulateInsertWithTutorSteps } from "./simulateInsert"; // ✅ file đang chứa simulateInsertWithTutorSteps bạn paste
import { simulateBalanceWithTutorSteps } from "./simulateBalance";

function deepestImbalance(root: AvlNode | null): string | null {
  let bestId: string | null = null;
  let bestDepth = -1;

  const dfs = (n: AvlNode | null, depth: number) => {
    if (!n) return;
    dfs(n.left, depth + 1);
    dfs(n.right, depth + 1);
    const b = getBF(n);
    if (Math.abs(b) > 1 && depth > bestDepth) {
      bestDepth = depth;
      bestId = n.id;
    }
  };

  dfs(root, 0);
  return bestId;
}

export function simulateInsertAVLWithTutorSteps(root: AvlNode | null, student: Student) {
  // 1) chạy insert BST (có ghost + compare steps)
  const ins = simulateInsertWithTutorSteps(root, student);

  let cur: AvlNode | null = recomputeHeights(ins.finalRoot);

  const steps: TutorStep[] = [...ins.steps];

  // 2) auto-balance nhiều lượt, mỗi lượt show rotate rõ ràng (LL/RR/LR/RL)
  let pass = 1;
  while (deepestImbalance(cur) && pass <= 12) {
    const simB = simulateBalanceWithTutorSteps(cur);

    for (const st of simB.steps) {
      steps.push({
        ...st,
        title: `Balance #${pass}: ${st.title}`,
        // ✅ giữ “form vừa nhập” luôn hiện khi xoay để user dễ hình dung
        ghost: { id: student.id.trim(), name: student.name.trim(), gpa: Number(student.gpa) },
        ghostMode: "floating",
      });
    }

    cur = simB.finalRoot;
    pass++;
  }

  steps.push({
    title: "Hoàn tất (AVL)",
    detail: `Kết thúc insert AVL cho ${student.id}.`,
    focusIds: [],
    snapshot: cur,
    compareText: "DONE",
    ghost: { id: student.id.trim(), name: student.name.trim(), gpa: Number(student.gpa) },
    ghostMode: "floating",
  });

  return { steps, finalRoot: cur };
}

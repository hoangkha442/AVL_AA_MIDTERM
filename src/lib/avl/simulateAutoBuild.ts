// import type { AvlNode, Student, TutorStep } from "./types";
// import { simulateInsertAVLWithTutorSteps } from "./simulateInsertAVL"; // ✅ THÊM DÒNG NÀY

// export function simulateAutoBuildFromNumbers(nums: number[]) {
//   let cur: AvlNode | null = null;
//   const steps: TutorStep[] = [];

//   nums.forEach((v, i) => {
//     const s: Student = { id: String(v), name: `Value ${v}`, gpa: v };

//     const sim = simulateInsertAVLWithTutorSteps(cur, s);

//     for (const st of sim.steps) {
//       steps.push({ ...st, title: `#${i + 1} Insert ${v} • ${st.title}` });
//     }

//     cur = sim.finalRoot;
//   });

//   steps.push({
//     title: "Hoàn tất Auto Build",
//     detail: `Đã dựng cây AVL từ ${nums.length} số.`,
//     focusIds: [],
//     snapshot: cur,
//     compareText: "DONE",
//   });

//   return { steps, finalRoot: cur };
// }

import type { AvlNode, Student, TutorStep } from "./types";
import { simulateInsertAVLWithTutorSteps } from "./simulateInsertAVL";

export function simulateAutoBuildFromNumbers(nums: number[]) {
  let cur: AvlNode | null = null;
  const steps: TutorStep[] = [];

  nums.forEach((v, i) => {
    const s: Student = { id: String(v), name: `Value ${v}`, gpa: v };

    const sim = simulateInsertAVLWithTutorSteps(cur, s);

    for (const st of sim.steps) {
      steps.push({
        ...st,
        title: `#${i + 1} Insert ${v} • ${st.title}`,
        batchIndex: i,
        batchValue: v,
      });
    }

    cur = sim.finalRoot;
  });

  steps.push({
    title: "Hoàn tất Auto Build",
    detail: `Đã dựng cây AVL từ ${nums.length} số.`,
    focusIds: [],
    snapshot: cur,
    compareText: "DONE",
    batchIndex: nums.length, 
  });

  return { steps, finalRoot: cur };
}

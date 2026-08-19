import { useState } from "react";
import RecruiterDashboard from "./RecruiterDashboard";
import RecruiterCandidateDetail from "./RecruiterCandidateDetail";

export default function RecruiterApp() {
  const [selectedCandidateId, setSelectedCandidateId] = useState(null);
  const [weights, setWeights] = useState({ behavioral: 33, "product-sense": 34, "ai-fluency": 33 });

  const setWeight = (id, value) => setWeights((w) => ({ ...w, [id]: value }));

  if (selectedCandidateId) {
    return (
      <RecruiterCandidateDetail
        candidateId={selectedCandidateId}
        weights={weights}
        onBack={() => setSelectedCandidateId(null)}
      />
    );
  }

  return (
    <RecruiterDashboard weights={weights} setWeight={setWeight} onSelectCandidate={setSelectedCandidateId} />
  );
}

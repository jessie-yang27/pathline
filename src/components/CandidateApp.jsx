import { useState } from "react";
import Landing from "./Landing";
import HowItWorks from "./HowItWorks";
import Intake from "./Intake";
import Discovery from "./Discovery";
import ReadinessGate from "./ReadinessGate";
import Permissions from "./Permissions";
import TrainingMaterials from "./TrainingMaterials";
import Assessment from "./Assessment";
import Results from "./Results";
import Matches from "./Matches";
import { INTAKE_DEFAULTS } from "../data";

const VIEWS = {
  LANDING: "landing",
  HOW_IT_WORKS: "how-it-works",
  INTAKE: "intake",
  DISCOVERY: "discovery",
  READINESS: "readiness",
  PERMISSIONS: "permissions",
  TRAINING: "training",
  ASSESSMENT: "assessment",
  RESULTS: "results",
  MATCHES: "matches",
};

export default function CandidateApp() {
  const [history, setHistory] = useState([VIEWS.LANDING]);
  const [survey, setSurvey] = useState(INTAKE_DEFAULTS);

  const view = history[history.length - 1];

  const go = (next) => setHistory((h) => [...h, next]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  const home = () => {
    setSurvey(INTAKE_DEFAULTS);
    setHistory([VIEWS.LANDING]);
  };

  // No back/home chrome on Landing (already home) or during the proctored Assessment.
  const navBack = history.length > 1 && view !== VIEWS.ASSESSMENT ? back : undefined;
  const navHome = view !== VIEWS.LANDING && view !== VIEWS.ASSESSMENT ? home : undefined;

  return (
    <>
      {view === VIEWS.LANDING && <Landing onStart={() => go(VIEWS.HOW_IT_WORKS)} />}

      {view === VIEWS.HOW_IT_WORKS && (
        <HowItWorks
          onBack={navBack}
          onHome={navHome}
          onContinueGeneric={() => go(VIEWS.READINESS)}
          onGatherInfo={() => go(VIEWS.INTAKE)}
        />
      )}

      {view === VIEWS.INTAKE && (
        <Intake
          initial={survey}
          onComplete={(data) => {
            setSurvey(data);
            go(VIEWS.DISCOVERY);
          }}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.DISCOVERY && (
        <Discovery
          survey={survey}
          onTakeAssessment={() => go(VIEWS.READINESS)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.READINESS && (
        <ReadinessGate
          onReady={() => go(VIEWS.PERMISSIONS)}
          onNotReady={() => go(VIEWS.TRAINING)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.PERMISSIONS && (
        <Permissions onContinue={() => go(VIEWS.ASSESSMENT)} onBack={navBack} onHome={navHome} />
      )}

      {view === VIEWS.TRAINING && (
        <TrainingMaterials onBackToGate={() => go(VIEWS.READINESS)} onBack={navBack} onHome={navHome} />
      )}

      {view === VIEWS.ASSESSMENT && <Assessment onComplete={() => go(VIEWS.RESULTS)} />}

      {view === VIEWS.RESULTS && (
        <Results onSeeMatches={() => go(VIEWS.MATCHES)} onBack={navBack} onHome={navHome} />
      )}

      {view === VIEWS.MATCHES && <Matches onBackToLanding={home} onBack={navBack} onHome={navHome} />}
    </>
  );
}

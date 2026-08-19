import { useState } from "react";
import Landing from "./Landing";
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
  const [view, setView] = useState(VIEWS.LANDING);
  const [survey, setSurvey] = useState(INTAKE_DEFAULTS);

  return (
    <>
      {view === VIEWS.LANDING && <Landing onStart={() => setView(VIEWS.INTAKE)} />}

      {view === VIEWS.INTAKE && (
        <Intake
          initial={survey}
          onComplete={(data) => {
            setSurvey(data);
            setView(VIEWS.DISCOVERY);
          }}
        />
      )}

      {view === VIEWS.DISCOVERY && (
        <Discovery survey={survey} onTakeAssessment={() => setView(VIEWS.READINESS)} />
      )}

      {view === VIEWS.READINESS && (
        <ReadinessGate
          onReady={() => setView(VIEWS.PERMISSIONS)}
          onNotReady={() => setView(VIEWS.TRAINING)}
        />
      )}

      {view === VIEWS.PERMISSIONS && <Permissions onContinue={() => setView(VIEWS.ASSESSMENT)} />}

      {view === VIEWS.TRAINING && <TrainingMaterials onBackToGate={() => setView(VIEWS.READINESS)} />}

      {view === VIEWS.ASSESSMENT && <Assessment onComplete={() => setView(VIEWS.RESULTS)} />}

      {view === VIEWS.RESULTS && <Results onSeeMatches={() => setView(VIEWS.MATCHES)} />}

      {view === VIEWS.MATCHES && (
        <Matches
          onBackToLanding={() => {
            setSurvey(INTAKE_DEFAULTS);
            setView(VIEWS.LANDING);
          }}
        />
      )}
    </>
  );
}

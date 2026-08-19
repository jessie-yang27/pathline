import { useState } from "react";
import Landing from "./Landing";
import Dashboard from "./Dashboard";
import Intake from "./Intake";
import Companies from "./Companies";
import ReadinessGate from "./ReadinessGate";
import Permissions from "./Permissions";
import TrainingMaterials from "./TrainingMaterials";
import Assessment from "./Assessment";
import Results from "./Results";
import { INTAKE_DEFAULTS, ASSESSMENT_SECTIONS } from "../data";

const VIEWS = {
  LANDING: "landing",
  DASHBOARD: "dashboard",
  INTAKE: "intake",
  COMPANIES: "companies",
  READINESS: "readiness",
  PERMISSIONS: "permissions",
  TRAINING: "training",
  ASSESSMENT: "assessment",
  RESULTS: "results",
};

const INITIAL_STATUS = { behavioral: false, "product-sense": false, "ai-fluency": false };

export default function CandidateApp() {
  const [history, setHistory] = useState([VIEWS.LANDING]);
  const [survey, setSurvey] = useState(INTAKE_DEFAULTS);
  const [surveyCompleted, setSurveyCompleted] = useState(false);
  const [assessmentStatus, setAssessmentStatus] = useState(INITIAL_STATUS);
  const [activeSectionId, setActiveSectionId] = useState(null);

  const view = history[history.length - 1];
  const activeSection = ASSESSMENT_SECTIONS.find((s) => s.id === activeSectionId);
  const scoreShared = Object.values(assessmentStatus).every(Boolean);

  const go = (next) => setHistory((h) => [...h, next]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));
  const home = () => {
    setSurvey(INTAKE_DEFAULTS);
    setSurveyCompleted(false);
    setAssessmentStatus(INITIAL_STATUS);
    setActiveSectionId(null);
    setHistory([VIEWS.LANDING]);
  };
  const returnToDashboard = () => {
    setActiveSectionId(null);
    setHistory([VIEWS.LANDING, VIEWS.DASHBOARD]);
  };

  // No back/home chrome on Landing (already home) or during the proctored Assessment.
  const navBack = history.length > 1 && view !== VIEWS.ASSESSMENT ? back : undefined;
  const navHome = view !== VIEWS.LANDING && view !== VIEWS.ASSESSMENT ? home : undefined;

  return (
    <>
      {view === VIEWS.LANDING && <Landing onStart={() => go(VIEWS.DASHBOARD)} />}

      {view === VIEWS.DASHBOARD && (
        <Dashboard
          assessmentStatus={assessmentStatus}
          surveyCompleted={surveyCompleted}
          onStartAssessment={(sectionId) => {
            setActiveSectionId(sectionId);
            // Only Behavioral runs the full recording/liveness-check gate for this demo;
            // Product Sense and AI Fluency skip straight to the assessment.
            go(sectionId === "behavioral" ? VIEWS.READINESS : VIEWS.ASSESSMENT);
          }}
          onStartSurvey={() => go(VIEWS.INTAKE)}
          onViewCompanies={() => go(VIEWS.COMPANIES)}
          onViewResults={() => go(VIEWS.RESULTS)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.INTAKE && (
        <Intake
          initial={survey}
          onComplete={(data) => {
            setSurvey(data);
            setSurveyCompleted(true);
            go(VIEWS.COMPANIES);
          }}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.COMPANIES && (
        <Companies
          scoreShared={scoreShared}
          onGoToDashboard={() => go(VIEWS.DASHBOARD)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.READINESS && activeSection && (
        <ReadinessGate
          sectionLabel={activeSection.label}
          minutes={activeSection.minutes}
          onReady={() => go(VIEWS.PERMISSIONS)}
          onNotReady={() => go(VIEWS.TRAINING)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.PERMISSIONS && activeSection && (
        <Permissions
          sectionLabel={activeSection.label}
          onContinue={() => go(VIEWS.ASSESSMENT)}
          onBack={navBack}
          onHome={navHome}
        />
      )}

      {view === VIEWS.TRAINING && (
        <TrainingMaterials onBackToGate={() => go(VIEWS.READINESS)} onBack={navBack} onHome={navHome} />
      )}

      {view === VIEWS.ASSESSMENT && activeSection && (
        <Assessment
          section={activeSection}
          onComplete={() => {
            setAssessmentStatus((s) => ({ ...s, [activeSection.id]: true }));
            returnToDashboard();
          }}
        />
      )}

      {view === VIEWS.RESULTS && (
        <Results
          assessmentStatus={assessmentStatus}
          onSeeCompanies={() => go(VIEWS.COMPANIES)}
          onBack={navBack}
          onHome={navHome}
        />
      )}
    </>
  );
}

import { useState } from "react";
import Landing from "./components/Landing";
import Intake from "./components/Intake";
import Discovery from "./components/Discovery";
import Assessment from "./components/Assessment";
import Results from "./components/Results";
import Matches from "./components/Matches";
import { INTAKE_DEFAULTS } from "./data";

const VIEWS = {
  LANDING: "landing",
  INTAKE: "intake",
  DISCOVERY: "discovery",
  ASSESSMENT: "assessment",
  RESULTS: "results",
  MATCHES: "matches",
};

function App() {
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
        <Discovery survey={survey} onTakeAssessment={() => setView(VIEWS.ASSESSMENT)} />
      )}

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

export default App;

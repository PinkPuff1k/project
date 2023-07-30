import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NotFound from "pages/NotFound";
import { EditUserForm } from "pages/edit";
const Page6 = React.lazy(() => import("pages/personal"));
const Page5 = React.lazy(() => import("pages/resumes"));
const Page4 = React.lazy(() => import("pages/register"));
const Page3 = React.lazy(() => import("pages/main"));
const Page2 = React.lazy(() => import("pages/login"));
const Page1 = React.lazy(() => import("pages/createResume"));
const Page = React.lazy(() => import("pages/vacancies"));
const CreateVacancy = React.lazy(() => import("pages/createVacancy"))
const PersonalEmployer=React.lazy(()=>import("pages/personalEmployer"))
const ProjectRoutes = () => {
  return (
    <React.Suspense fallback={<>Loading...</>}>
      <Router>
        <Routes>
          <Route path="/" element={<Page3 />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/vacancies" element={<Page />} />
          <Route path="/createResume" element={<Page1 />} />
          <Route path="/createVacancy" element={<CreateVacancy />} />
          <Route path="/login" element={<Page2 />} />
          <Route path="/main" element={<Page3 />} />
          <Route path="/register" element={<Page4 />} />
          <Route path="/resume" element={<Page5 />} />
          <Route path="/personal/edit" element={<EditUserForm />} />
          <Route path="/personal" element={<Page6 />} />
          <Route path="/personalEmployer" element={<PersonalEmployer />} />
        </Routes>
      </Router>
    </React.Suspense>
  );
};
export default ProjectRoutes;

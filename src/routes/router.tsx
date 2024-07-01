import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ReactGA from 'react-ga4';
import Login from '../pages/Login';
import Report from '../pages/Report';
import ErrorPage from '../pages/ErrorPage';
import DefaultLayout from '../layout/DefaultLayout';
import { Home } from '../pages/Home';
import { InsertJobs } from '../pages/InsertJobs';
import { RequireAuth } from '../contexts/Auth/RequireAuth';
import AddJobs from '../pages/AddJobs';
import FeedJobs from '../pages/FeedJobs';
import ConfirmEmail from '../pages/ConfirmEmail';
import ResetPassword from '../pages/ResetPassword';
import ConfirmRegister from '../pages/ConfirmRegister';
import CompanyPortal from '../pages/CompanyPortal';
import CandidatePortal from '../pages/CandidatePortal';
import JobApply from '../pages/ApplyJob';
import { ProfileSettings } from '../pages/ProfileSettings';
import { CandidateSettings } from '../pages/CandidateSettings';
import CompanyApplications from '../pages/CompanyApplications';
import JobsPanel from '../pages/JobsPanel';
import MatchJobs from '../pages/MatchJobs';
import ChangePassword from '../pages/ChangePassword';
import JobSelected from '../pages/JobSelected';

const NavRoutes: React.FC = () => {
    ReactGA.initialize(`${process.env.REACT_APP_GOOGLE_ANALYTICS_KEY}`);
    // ReactGA.pageview(window.location.pathname + window.location.search);

    return (
        <BrowserRouter>
            <Routes>
                <Route element={<DefaultLayout />}>
                    <Route index element={<Home />} />
                    <Route path="job" element={<FeedJobs />} />
                    <Route path="job/:searchTerm" element={<FeedJobs />} />
                    <Route path="job/selected/:id" element={<JobSelected />} />
                </Route>

                <Route path="/login" element={<Login />} />
                <Route path="confirm-email" element={<ConfirmEmail />} />
                <Route path="userconfirmation" element={<ConfirmRegister />} />
                <Route
                    path="companyconfirmation"
                    element={<ConfirmRegister />}
                />
                <Route path="recovery-password" element={<ResetPassword />} />
                <Route path="change-password" element={<ChangePassword />} />
                {/* atualizar layout */}
                <Route
                    path="company-portal"
                    element={
                        <RequireAuth>
                            <CompanyPortal />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="candidate-portal"
                    element={
                        <RequireAuth>
                            <CandidatePortal />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="candidate-settings"
                    element={
                        <RequireAuth>
                            <CandidateSettings />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="profile-settings"
                    element={
                        <RequireAuth>
                            <ProfileSettings />
                        </RequireAuth>
                    }
                />
                <Route
                    path="insertjob"
                    element={
                        <RequireAuth>
                            <InsertJobs />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="applications"
                    element={
                        <RequireAuth>
                            <CompanyApplications />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="jobs-panel"
                    element={
                        <RequireAuth>
                            <JobsPanel />
                        </RequireAuth>
                    }
                />

                {/* atualizar layout */}
                <Route
                    path="match-jobs"
                    element={
                        <RequireAuth>
                            <MatchJobs />
                        </RequireAuth>
                    }
                />

                <Route path="addjobs" element={<AddJobs />} />

                <Route
                    path="apply/:id"
                    element={
                        <RequireAuth>
                            <JobApply />
                        </RequireAuth>
                    }
                />

                <Route path="report/:id" element={<Report />} />
                <Route path="*" element={<ErrorPage />} />
            </Routes>
        </BrowserRouter>
    );
};

export default NavRoutes;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { selectNewUser } from "./features/newUserSlice";
import { login, logout, selectUser } from "./features/userSlice";
import { setUserDoc } from "./features/userDocSlice";
import ForgotEmail from "./pages/Forgotemail/ForgotEmail";
import Card from "./pages/AfterSignUp/Cards/Card";
import PasswordReset from "./pages/PasswordRecover/PasswordReset";
import Experience from "./pages/AfterSignUp/Experience/Experience";
import Industry from "./pages/AfterSignUp/Industry/Industry";
import Onboarding from "./pages/AfterSignUp/Onboarding/Onboarding";
import Education from "./pages/AfterSignUp/Education/Education";
import Gender from "./pages/AfterSignUp/Gender/Gender";
import Review from "./pages/AfterSignUp/Review page/Review";
import Confirmation from "./pages/AfterSignUp/Confirmation/Confirmation";
import { onAuthStateChanged } from "firebase/auth";
import Verification from "./pages/AfterSignUp/Verification/Verification";
import { Toaster } from "react-hot-toast";
import BusinessPlanning from "./pages/AfterKnowledge/BusinessPlanning/BusinessPlanning";
import BuildAudience from "./pages/AfterKnowledge/BuildAudience/BuildAudience";
import BusinessModal from "./pages/AfterKnowledge/BusinessModal/BusinessModal";
import BetaTestingOld from "./pages/AfterKnowledge/BetaTesting/BetaTesting";
import ESOP from "./pages/AfterKnowledge/ESOP/ESOP";
import ArticleNavigation from "./pages/ArticleNavigation/ArticleNavigation";
import EquityAndEverything from "./pages/AfterKnowledge/EquityAndEverything/EquityAndEverything";
import IV_Slides from "./pages/AfterKnowledge/Idea Validation & EP/IV_Slides";
import ESOP_Slides from "./pages/AfterKnowledge/ESOP/ESOP_Slides";
import BetaSlide from "./pages/AfterKnowledge/BetaTesting/BetaSlide";
import FundraisingSlides from "./pages/AfterKnowledge/FundraisingAndMeans/FundraisingSlides";
import FundraisingAndMeans from "./pages/AfterKnowledge/FundraisingAndMeans/FundraisingAndMeans";
import MentorForm from "./pages/MentorForm/MentorForm";
import MentorMoreDetails from "./pages/MentorForm/MentorMoreDetails";
import Mentor from "./pages/Mentor/Mentor";
import Funding from "./pages/Funding/FundingPage/Funding";
import FundingForm from "./pages/Funding/FundingForm";
import MentorProfile from "./pages/MentorProfile/MentorProfile";
import Schedule from "./pages/Schedule/Schedule";
import ReachingOutSlides from "./pages/AfterKnowledge/ReachingOutToInvestor/ReachingOutSlides";
import BusinessPlanningSlides from "./pages/AfterKnowledge/BusinessPlanning/BusinessPlanningSlides";
import EESlides from "./pages/AfterKnowledge/EquityAndEverything/EESlides";
import FinanceforStartupSlides from "./pages/AfterKnowledge/FinanceForStartup/FinanceforStartupSlides";
import FInanceForStartup from "./pages/AfterKnowledge/FinanceForStartup/FInanceForStartup";
import ReachingOutToInvestor from "./pages/AfterKnowledge/ReachingOutToInvestor/ReachingOutToInvestor";
import SocialMediaSlides from "./pages/AfterKnowledge/SocialMedia/SocialMediaSlides";
import SocialMedia from "./pages/AfterKnowledge/SocialMedia/SocialMedia";
import NotFound from "./pages/NotFound/NotFound";
import BuildAudienceSlides from "./pages/AfterKnowledge/BuildAudience/BuildAudienceSlides";
import BusinessModalSlides from "./pages/AfterKnowledge/BusinessModal/BusinessModalSlides";
import CompetitorAnalysis from "./pages/AfterKnowledge/CompetitorAnalysis/CompetitorAnalysis";
import CompetitorAnalysisSlides from "./pages/AfterKnowledge/CompetitorAnalysis/CompetitorAnalysisSlides";
import ProductDevelopment from "./pages/AfterKnowledge/ProductDevelopment/ProductDevelopment";
import ProductDevelopmentSlide from "./pages/AfterKnowledge/ProductDevelopment/ProductDevelopmentSlide";
import ThinkingOfStartup from "./pages/AfterKnowledge/ThinkingOfStartup/ThinkingOfStartup";
import ThinkingOfStartupSlide from "./pages/AfterKnowledge/ThinkingOfStartup/ThinkingOfStartupSlide";
import Dashboard from "./pages/New Dashboard/Dashboard";
import ChangePassword from "./pages/Change Password/ChangePassword";
import GetFundedPage from "./pages/Get Funded/GetFundedPage";
import SharedCommunityPost from "./pages/Shared Community Post/SharedCommunityPost";
import PaymentMentorMeetingSchedule from "./components/Payment For Mentor Meeting Schedule/PaymentMentorMeetingSchedule";
import PPTTemplates from "./pages/PPT Templates/PPTTemplates";
import PPTTemplatesViewer from "./pages/PPT Templates/PPT Templates Viewer/PPTTemplatesViewer";
import DocumentTemplates from "./pages/Document Templates/DocumentTemplates";
import DocumentTemplatesViewer from "./pages/Document Templates/Document Templates Viewer/DocumentTemplatesViewer";
import EquityAndEverythingg from "./pages/New Courses/Courses/EquityAndEverythingg";
import BetaTesting from "./pages/New Courses/Courses/BetaTesting";
import StartupIdea from "./pages/New Courses/Courses/StartupIdea";
import ReachingOutToInvestorr from "./pages/New Courses/Courses/ReachingOutToInvestor";
import OnboardingScreen from "./pages/Onboarding Screens/OnboardingScreen";
import Tools from "./pages/Tools/Tools";
import GoogleSignupInfoPage from "./pages/Onboarding Screens/Google Signup Info Page/GoogleSignupInfoPage";
import Upgrade from "./pages/Upgrade/Upgrade";
import Chat from "./pages/Chat/Chat";
import DummyTest from "./pages/Dummy Test Page/DummyTest";
import Test from "./TestPage/Test";
import Discover from "./pages/Discover/Discover";
import Featured from "./pages/Articles/Featured";
import Accounting from "./pages/Articles/Accounting";
import Business from "./pages/Articles/Business";
import Consulting from "./pages/Articles/Consulting";
import Gaming from "./pages/Articles/Gaming";
import Design from "./pages/Articles/Design";
import Enterpreneurship from "./pages/Articles/Enterpreneurship";
import Finance from "./pages/Articles/Finance";
import Healthcare from "./pages/Articles/Healthcare";
import MentorTesting from "./pages/Mentors/MentorTesting";
import ScheduleTesting from "./pages/Schedule/ScheduleTesting";
import MentorSearch from "./pages/MentorSearch/MentorSearch";
import KnowledgeTesting from "./pages/Knowledge/KnowledgeTesting";
import CheckYourScoreTesting from "./pages/Check Your Score/CheckYourScoreTesting";
import CourcePageTesting from "./pages/AfterKnowledge/CourcesPage/CourcePageTesting";
import HomeNotLoggedIn from "./pages/HomeNotLoggedIn/HomeNotLoggedIn";
import LoginTesting from "./pages/Login/LoginTesting";
import UserProfileTesting from "./pages/User Profile/UserProfileTesting";
import UserEditProfileTesting from "./pages/User Edit Page/UserEditProfileTesting";
import First from "./pages/OnboardingNew/First/First";
import Second from "./pages/OnboardingNew/Second/Second";
import Third from "./pages/OnboardingNew/Third/Third";
import Fourth from "./pages/OnboardingNew/Fourth/Fourth";
import Fifth from "./pages/OnboardingNew/Fifth/Fifth";
import SignupAuthUpdated from "./pages/Auth/SignupAuthUpdated";
import EnterOtpUpdated from "./pages/EnterOtpUpdated/EnterOtpUpdated";
import ForgotpasswordUpdated from "./pages/ForgotpasswordUpdated/ForgotpasswordUpdated";
import User from "./pages/User/User";
import MentorEditProfile from "./pages/MentorProfile/MentorEditProfile";
import MentorProfileid from "./pages/MentorProfile/MentorProfileid";
import FundingPageNew from "./pages/Funding page new/FundingPageNew";
import MentorDashBoard from "./pages/MentorDashboard/MentorDashBoard";
import VibeTestA from "./pages/Vibe/VibeTestA";
import VibeOuter from "./pages/Vibe/Left/LeftContainer";
import FilterPart from "./pages/Vibe/FilterPart/FilterPart";
import CreateEvent from "./pages/Events/EventsCreate/CreateEvent";
import EventsSuccess from "./pages/Events/EventsSuccess/EventsSuccess";
import EventsForm from "./pages/Events/EventsForm/EventsForm";
import EventsMainPage from "./pages/Events/EventsMain/EventsMainPage";
import HiringForm from "./pages/job posting/HiringForm";
import HiringMainScreen from "./pages/job posting/HiringMainScreen";
import AppliedJob from "./pages/job posting/AppliedJob";
import LoginWithOtpFirst from "./pages/LoginWithOTP/LoginWithOtpFirst";
import { auth, db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";

function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const newUser = useSelector(selectNewUser);
  const userDoc = useSelector((state) => state.userDoc);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          login({
            email: auth.currentUser.email,
            uid: auth.currentUser.uid,
            displayName: auth.currentUser.displayName,
            photoURL: auth.currentUser.photoURL,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  // Fetch current user doc from firebase and set it to redux store
  useEffect(() => {
    if (user) {
      async function fetchUserDocFromFirebase() {
        const docRef = doc(db, "Users", user?.email);
        const docSnapshot = await getDoc(docRef);

        if (docSnapshot.exists()) {
          const data = docSnapshot.data();
          dispatch(setUserDoc(data));
        }
      }
      fetchUserDocFromFirebase();
    }
  }, [user]);

  return (
    <>
      <Toaster />
      <Routes>
        {!user && (
          <>
            <Route path='/' element={<LoginTesting />} />
            <Route path='/signup' element={<SignupAuthUpdated />}></Route>
            <Route path='/login' element={<LoginTesting />} />
            <Route path='/otp-login' element={<LoginWithOtpFirst />} />
            <Route path='/gallery' element={<HomeNotLoggedIn />}></Route>
            <Route path='/onboarding-first' element={<First />}></Route>
            <Route path='/onboarding-second' element={<Second />}></Route>
            <Route path='/onboarding-third' element={<Third />}></Route>
            <Route path='/onboarding-fourth' element={<Fourth />}></Route>
            <Route path='/onboarding-fifth' element={<Fifth />}></Route>
            <Route path=':postId' element={<SharedCommunityPost />}></Route>
          </>
        )}
        {/* <Route path="/login-test" element={<LoginTesting />}/> */}
        <Route path='/signup' element={<SignupAuthUpdated />}></Route>
        <Route path='/otp-login' element={<LoginWithOtpFirst />} />
        <Route path='/forgot-password' element={<ForgotpasswordUpdated />} />
        <Route path='/forgotemail' element={<ForgotEmail />} />
        <Route path='/password-reset' element={<PasswordReset />} />
        {newUser ? (
          <>
            <Route path='enterotp' element={<EnterOtpUpdated />}></Route>
          </>
        ) : null}
        <Route path='/onboarding-first' element={<First />}></Route>
        <Route path='/onboarding-second' element={<Second />}></Route>
        <Route path='/onboarding-third' element={<Third />}></Route>
        <Route path='/onboarding-fourth' element={<Fourth />}></Route>
        <Route path='/onboarding-fifth' element={<Fifth />}></Route>
        <Route path='/startup-list' element={<Card />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/industry' element={<Industry />} />
        <Route path='/experience' element={<Experience />} />
        <Route path='/education' element={<Education />} />
        <Route path='/gender' element={<Gender />} />
        <Route path='/startup-confirm' element={<Confirmation />} />
        <Route path='/startup-onboarding' element={<Onboarding />} />
        <Route path='/startup-review' element={<Review />} />
        <Route path='/startup-verification' element={<Verification />} />
        <Route path='/schedule' element={<Schedule />}></Route>
        <Route
          path='/schedule/:id/:userEmail'
          element={<ScheduleTesting />}
        ></Route>
        <Route path='/' element={<Dashboard />} />
        {/* <Route path="/knowledge" element={<Knowledge />}></Route> */}
        <Route path='/knowledge' element={<KnowledgeTesting />}></Route>
        {/* <Route path="/com" element={<BusinessPlanningSlides />}></Route> */}
        <Route path='/mentors' element={<MentorTesting />}></Route>
        <Route
          path='/mentors-search/:category'
          element={<MentorSearch />}
        ></Route>
        <Route path='/mentor-edit-profile' element={<MentorEditProfile />} />
        <Route path='/mentor' element={<Mentor />}></Route>
        <Route path='/mentorform' element={<MentorForm />}></Route>
        <Route path='/mentordetails' element={<MentorMoreDetails />}></Route>
        <Route path='/funding' element={<Funding />}></Route>
        <Route path='/fundingform' element={<FundingForm />}></Route>
        <Route path='/mentor-profile' element={<MentorProfile />}></Route>
        <Route path='/mentorprofile/:id' element={<MentorProfileid />}></Route>
        <Route path='/mentordashboard' element={<MentorDashBoard />}></Route>
        <Route path='/community' element={<Test />}>
          {/* <Route path="/community" element={<CommunityFinalDark />}> */}
          {/* <Route path="/community" element={<CommunityFinal />}> */}
          <Route path=':postId' element={<SharedCommunityPost />}></Route>
        </Route>
        <Route
          path='/schedule/:id/:userEmail'
          element={<ScheduleTesting />}
        ></Route>
        <Route path='/betaslide' element={<BetaSlide />}></Route>
        <Route path='/eeslides' element={<EESlides />}></Route>
        <Route
          path='/equityandeverything'
          element={<EquityAndEverything />}
        ></Route>
        <Route
          path='/financeforstartup'
          element={<FInanceForStartup />}
        ></Route>
        <Route
          path='/financeforstartupslides'
          element={<FinanceforStartupSlides />}
        ></Route>
        <Route path='/betatesting' element={<BetaTestingOld />}></Route>
        <Route path='/betatestingslides' element={<BetaSlide />}></Route>

        <Route path='/buildingaudience' element={<BuildAudience />}></Route>
        <Route
          path='/buildingaudienceslides'
          element={<BuildAudienceSlides />}
        ></Route>

        <Route path='/buisnessmodal' element={<BusinessModal />}></Route>
        <Route
          path='/buisnessmodalslides'
          element={<BusinessModalSlides />}
        ></Route>

        <Route path='/buisnessplanning' element={<BusinessPlanning />}></Route>
        <Route
          path='/buisnessplanningslides'
          element={<BusinessPlanningSlides />}
        ></Route>

        <Route
          path='/competitoranalysis'
          element={<CompetitorAnalysis />}
        ></Route>
        <Route
          path='/competitoranalysisslides'
          element={<CompetitorAnalysisSlides />}
        ></Route>

        <Route
          path='/productdevelopment'
          element={<ProductDevelopment />}
        ></Route>
        <Route
          path='/productdevelopmentslides'
          element={<ProductDevelopmentSlide />}
        ></Route>

        <Route
          path='/thinkingofstartup'
          element={<ThinkingOfStartup />}
        ></Route>
        <Route
          path='/thinkingofstartupslides'
          element={<ThinkingOfStartupSlide />}
        ></Route>

        <Route path='/esop' element={<ESOP />}></Route>
        <Route path='/esop-slides' element={<ESOP_Slides />}></Route>
        {/* <Route path="/idea-validation" element={<IdeaValidation />}></Route> */}
        <Route path='/idea-validation' element={<CourcePageTesting />}></Route>
        <Route path='/idea-validation-slides' element={<IV_Slides />}></Route>
        <Route
          path='/fundraising-and-means'
          element={<FundraisingAndMeans />}
        ></Route>
        <Route
          path='/fundraising-and-means-slides'
          element={<FundraisingSlides />}
        ></Route>
        <Route
          path='/reaching-out-to-investor'
          element={<ReachingOutToInvestor />}
        ></Route>
        <Route
          path='/reaching-out-to-investor-slides'
          element={<ReachingOutSlides />}
        ></Route>
        <Route path='/social-media' element={<SocialMedia />}></Route>
        <Route
          path='/social-media-slides'
          element={<SocialMediaSlides />}
        ></Route>
        {/* <Route path="/userprofile" element={<UserProfile />}></Route> */}
        <Route path='/userprofile' element={<UserProfileTesting />}></Route>
        <Route path='/editProfile' element={<UserEditProfileTesting />}></Route>
        <Route path='/userprofile/:id' element={<User />}></Route>
        {/* <Route path="/user-edit-profile" element={<UserEditProfile />}></Route> */}
        <Route
          path='/change-user-password'
          element={<ChangePassword />}
        ></Route>
        <Route path='/funding-form' element={<GetFundedPage />}></Route>
        <Route path='/funding-page' element={<FundingPageNew />}></Route>
        <Route path='*' element={<NotFound />}></Route>
        <Route
          path='/payment'
          element={<PaymentMentorMeetingSchedule />}
        ></Route>
        <Route path='/pptTemplates' element={<PPTTemplates />}></Route>
        <Route
          path='/pptTemplates/:id'
          element={<PPTTemplatesViewer />}
        ></Route>
        <Route
          path='/documentTemplates'
          element={<DocumentTemplates />}
        ></Route>
        <Route
          path='/documentTemplates/:id'
          element={<DocumentTemplatesViewer />}
        ></Route>
        {/* <Route path="/start-up" element={<CheckYourScore />}></Route> */}
        <Route path='/start-up' element={<CheckYourScoreTesting />}></Route>
        <Route
          path='/newcourses/EquityAndEverything'
          element={<EquityAndEverythingg />}
        ></Route>
        <Route path='/newcourses/BetaTesting' element={<BetaTesting />}></Route>
        <Route path='/newcourses/StartupIdea' element={<StartupIdea />}></Route>
        <Route
          path='/newcourses/ReachingOutToInvestor'
          element={<ReachingOutToInvestorr />}
        ></Route>
        <Route path='/OnboardingScreen' element={<OnboardingScreen />}></Route>
        <Route
          path='/onboardingGeneralInfoScreen'
          element={<GoogleSignupInfoPage />}
        ></Route>
        <Route path='/tools' element={<Tools />}></Route>
        {/* <Route path="/rs501" element={<RsFiveOneZero />}></Route> */}
        {/* <Route
          path="/newcourses/CompetitorAnalysis"
          element={<CompetitorAnalysis />}
        ></Route>
        <Route
          path="/newcourses/BuildAudience"
          element={<BuildAudience />}
        ></Route> */}
        <Route path='/upgrade' element={<Upgrade />} />
        <Route path='/messages' element={<Chat />}></Route>
        <Route path='/dummy_test' element={<DummyTest />}></Route>
        <Route path='/discover' element={<Discover />}></Route>
        <Route path='/discover/featured' element={<Featured />}></Route>
        <Route path='/discover/accounting' element={<Accounting />}></Route>
        <Route path='/discover/business' element={<Business />}></Route>
        <Route path='/discover/consulting' element={<Consulting />}></Route>
        <Route path='/discover/gaming' element={<Gaming />}></Route>
        <Route path='/discover/design' element={<Design />}></Route>
        <Route path='/discover/:id' element={<ArticleNavigation />}></Route>
        <Route
          path='/discover/enterpreneurship'
          element={<Enterpreneurship />}
        ></Route>
        <Route path='/discover/finance' element={<Finance />}></Route>
        <Route path='/discover/healthcare' element={<Healthcare />}></Route>
        <Route
          path='/vibe/main'
          element={
            userDoc?.vibeuser !== true ? (
              <Navigate replace to={"/vibe"} />
            ) : (
              <VibeTestA />
            )
          }
        ></Route>
        <Route path='/vibetestingb' element={<FilterPart />}></Route>
        <Route
          path='/vibe'
          element={
            userDoc?.vibeuser === true ? (
              <Navigate replace to={"/vibe/main"} />
            ) : (
              <VibeOuter />
            )
          }
        ></Route>
        <Route path='/hiringMainScreen' element={<HiringMainScreen />}></Route>
        <Route path='/hiringForm' element={<HiringForm />}></Route>
        <Route path='/appliedjob' element={<AppliedJob />}></Route>

        <Route path='/event/createevent' element={<CreateEvent />}></Route>
        <Route path='/event/eventsuccess' element={<EventsSuccess />}></Route>
        <Route path='/event/eventform' element={<EventsForm />}></Route>
        <Route path='/event/eventmain' element={<EventsMainPage />}></Route>
        {/* <Route path="/speaker" element={<SpeakerProfile />}></Route> */}
      </Routes>
    </>
  );
}

export default App;

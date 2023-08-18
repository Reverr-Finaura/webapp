import style from "./AppliedJob.module.css";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import demo from "../../images/demo-company.png"

export default function AppliedJob() {
  return (
    <>
    <NavBarFinalDarkMode/>
    <div className={style.block}>
    <p className={style.backbtn}>&lt; My Job Applications</p>
      <div className={style.heading}>
        <p>Company</p>
        <p>profile</p>
        <p>Applied on</p>
        <p>Status</p>
      </div>
      <div className={style.appliedjobs}>
        <div className={style.row}>
          <p className={style.companyName}>Infotech Pvt.LTD</p>
          <p className={style.profile}>Digital Marketing</p>
          <p className={style.applieddate}>28/07/2023</p>
          <p className={style.status}>Applied</p>
          <button className={style.review}>Review Application</button>
        </div>
        <div className={style.row}>
          <p className={style.companyName}>Infotech Pvt.LTD</p>
          <p className={style.profile}>Digital Marketing</p>
          <p className={style.applieddate}>28/07/2023</p>
          <p className={style.status}>Applied</p>
          <button className={style.review}>Review Application</button>
        </div>
        <div className={style.row}>
          <p className={style.companyName}>Infotech Pvt.LTD</p>
          <p className={style.profile}>Digital Marketing</p>
          <p className={style.applieddate}>28/07/2023</p>
          <p className={style.status}>Applied</p>
          <button className={style.review}>Review Application</button>
        </div>
        <div className={style.row}>
          <p className={style.companyName}>Infotech Pvt.LTD</p>
          <p className={style.profile}>Digital Marketing</p>
          <p className={style.applieddate}>28/07/2023</p>
          <p className={style.status}>Applied</p>
          <button className={style.review}>Review Application</button>
        </div>
      </div>
      <div className={style.jobRecommendation}>
        <h3>More Jobs Recommendations For you</h3>
        <p className={style.para}>Based on your pofile and search history</p>
        <div className={style.jobs}>
          <div className={style.card}>
            <div className={style.left}>
              <img src={demo} />
            </div>
            <div className={style.right}>
              <div className={style.upperpart}>
                <div className={style.upperleft}>
                  <p className={style.companyPosition}>Marketing Intern</p>
                  <p className={style.companyidentity}>Infotech Pvt. LTd.</p>
                </div>
                <div className={style.upperright}>
                    <p>2 weeks ago</p>

                </div>
              </div>
              
              <div className={style.lowerpart}>
                     <div className={style.lowerleft}>
                        <div>
                            <p>Delhi,India</p>
                            <p>On-site</p>
                        </div>
                        <p>View Details</p>
                     </div>
                     <button className={style.applynow}>Apply Now</button>
               </div>

            </div>

          </div>
          <div className={style.card}>
            <div className={style.left}>
              <img src={demo} />
            </div>
            <div className={style.right}>
              <div className={style.upperpart}>
                <div className={style.upperleft}>
                  <p className={style.companyPosition}>Marketing Intern</p>
                  <p className={style.companyidentity}>Infotech Pvt. LTd.</p>
                </div>
                <div className={style.upperright}>
                    <p>2 weeks ago</p>

                </div>
              </div>
              
              <div className={style.lowerpart}>
                     <div className={style.lowerleft}>
                        <div>
                            <p>Delhi,India</p>
                            <p>On-site</p>
                        </div>
                        <p>View Details</p>
                     </div>
                     <button className={style.applynow}>Apply Now</button>
               </div>

            </div>

          </div>
          <div className={style.card}>
            <div className={style.left}>
              <img src={demo} />
            </div>
            <div className={style.right}>
              <div className={style.upperpart}>
                <div className={style.upperleft}>
                  <p className={style.companyPosition}>Marketing Intern</p>
                  <p className={style.companyidentity}>Infotech Pvt. LTd.</p>
                </div>
                <div className={style.upperright}>
                    <p>2 weeks ago</p>

                </div>
              </div>
              
              <div className={style.lowerpart}>
                     <div className={style.lowerleft}>
                        <div>
                            <p>Delhi,India</p>
                            <p>On-site</p>
                        </div>
                        <p>View Details</p>
                     </div>
                     <button className={style.applynow}>Apply Now</button>
               </div>

            </div>

          </div>
        </div>
      </div>
    </div>
    </>
  );
}

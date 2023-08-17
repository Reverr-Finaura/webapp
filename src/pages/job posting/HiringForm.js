import React from "react";
import NavBarFinalDarkMode from "../../components/Navbar Dark Mode/NavBarFinalDarkMode";
import "../MentorProfile/form.css";
import style from "./HiringForm.module.css";

export default function HiringForm() {
  return (
    <>
      <NavBarFinalDarkMode />
      <div className={style.block}>
        <button className={style.backbtn}> &lt; Post a Job</button>
        <form className={style.form}>
          <div className={`${style.section} ${style.section1}`}>
            <h2 className={style.heading}>Job Details</h2>
            <div className="form-row">
              <label htmlFor="currentPassword">
                Job Title <span className={style.required}>*</span>
              </label>
              <input
                type="text"
                id="jobtitle"
                placeholder="UI/UX Designer"
                required
              />
            </div>
            <div className="form-row">
              <label>
                Company <span className={style.required}>*</span>
              </label>
              <input type="text" id="Company" placeholder="Reverr" required />
            </div>
            <div className={style.checklist}>
              <label>
                WorkPlace Type <span className={style.required}>*</span>
              </label>
              <div className={style.labeldiv}>
                <label>
                  <input
                    className={style.inputcheck}
                    type="checkbox"
                    name="location"
                    value="on-site"
                  />
                  <span className={style.checkbox}></span>
                  On-Site
                </label>
                <label>
                  <input
                    className={style.inputcheck}
                    type="checkbox"
                    name="location"
                    value="hybrid"
                  />
                  <span className={style.checkbox}></span>
                  Hybrid
                </label>
                <label>
                  <input
                    className={style.inputcheck}
                    type="checkbox"
                    name="location"
                    value="remote"
                  />
                  <span className={style.checkbox}></span>
                  Remote
                </label>
              </div>
            </div>
            <div className="form-row">
              <label htmlFor="joblocation">
                Job Location <span className={style.required}>*</span>
              </label>
              <select
                id={style.joblocation}
                placeholder="Delhi , India"
                required
              >
                <option value="demo1">Delhi, India</option>
                <option value="demo1">Demo 1</option>
                <option value="demo2">Demo 2</option>
                <option value="demo3">Demo 3</option>
              </select>
            </div>
            <div className="form-row">
              <label htmlFor="joblocation">
                Job Type <span className={style.required}>*</span>
              </label>
              <select id={style.jobtype} placeholder="Delhi , India" required>
                <option value="demo1">Full Time</option>
                <option value="demo1">Part Time</option>
                <option value="demo2">Contract</option>
                <option value="demo3">Commission-Based</option>
              </select>
            </div>

            <div className="form-row">
              <label htmlFor="about">
                Job Description: <span className={style.required}>*</span>
              </label>
              <textarea
                id={style.about}
                placeholder="Start Typing..."
                className="about"
              />
            </div>

            <div className="form-row">
              <label>
                Add Skills <span className={style.required}>*</span>
              </label>
              <div className={style.skills}>
                <p className={style.skillstag}>Digital Marketing</p>
                <p className={style.skillstag}>Graphic Design</p>
                <p className={style.skillstag}>Visualization</p>
                <p className={style.skillstag}>Data Analysis</p>
                <p className={style.skillstag}>Communication</p>
              </div>
            </div>
          </div>
          <div className={`${style.section} ${style.section2}`}>
            <h2 className={style.heading}>Applicant Collection Details</h2>
            <div className="form-row">
              <label>
                Name<span className={style.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                placeholder="Jatin Khurana"
                required
              />
            </div>
            <div className="form-row">
              <label>
                Email Address<span className={style.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                placeholder="jatin_k0123@gmail.com"
                required
              />
            </div>
          </div>
          <div className={`${style.section} ${style.section3}`}>
            <h2 className={style.heading}>Screening Questions</h2>

            <h3 className={style.subHeading}>
              Have you completed the following level of education: [Degree]?
            </h3>
            <div className="form-row">
              <label>
                Degree<span className={style.required}>*</span>
              </label>
              <input
                type="text"
                id="degree"
                placeholder="Bachelor's Degree"
                required
              />
            </div>
            <div className="form-row">
              <label>
                Ideal Answer<span className={style.required}>*</span>
              </label>
              <input type="text" id="ans" placeholder="Yes" required />
            </div>

            {/* <input type="checkbox">Must have this qualification</input> */}
            <div className={style.check}>
              <input className={style.checkinput} type="checkbox" />
              <label>Must have this qualification</label>
            </div>
            <h3 className={style.subHeading}>
              How many years of experience do you have with [Skill]?
            </h3>
            <div className="form-row">
              <label>
                skills<span className={style.required}>*</span>
              </label>
              <input type="text" placeholder="Bachelor's Degree" required />
            </div>
            <div className="form-row">
              <label>
                Ideal Answer<span className={style.required}>*</span>
              </label>
              <input type="number" placeholder="1" required />
            </div>
            <div className={style.check}>
              <input type="checkbox" className={style.checkinput} />
              <label>Must have this qualification</label>
            </div>

            <div className="form-row">
              <label>
                Add Screening Question<span className={style.required}>*</span>
              </label>
              <input type="text" placeholder="Jatin Khurana" required />
            </div>
            <div className={style.addquestion}>
              <p>Add Another Question +</p>
            </div>
            <div className={style.check}>
              <input type="checkbox" className={style.checkinput} />
              <label>
                I agree to Reverr’s Jobs{" "}
                <span className={style.highlight}> Terms and Conditions </span>{" "}
                including our policies prohibiting discriminatory job posts.
              </label>
            </div>
          </div>
          <div className={style.btnsgrp}>
            <button className={style.postbtn}>Post Job</button>
            <button className={style.prev}>Preview</button>
          </div>
        </form>
      </div>
    </>
  );
}

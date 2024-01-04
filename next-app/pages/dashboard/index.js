import React from "react";
import Head from "next/head";
import Header from "../../components/header";
import Footer from "../../components/footer";
import { Container } from "react-bootstrap-v5";
import { AiOutlinePlus } from "react-icons/ai";
import { useSelector } from "react-redux";
import Link from "next/link";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { getSession } from "next-auth/client";
const Dashboard = async ({ name, email }) => {
  console.log("Name: " + name);
  console.log("Email:" + email);
  const firstName = name.split(" ");

  const { isAuth, isLoading } = useSelector((state) => state.AuthReducer);
  let description = null;
  const res = await fetch("....", {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email }),
  });
  if (res.ok) {
    description = res.json();
  }
  return (
    <>
      <div className="dashboard-wrapper">
        <Head>
          <title>Dashboard</title>

          <link
            rel="canonical"
            href={`${process.env.NEXT_PUBLIC_DOMAIN_URL}`}
          ></link>
        </Head>

        <Header />
        {isAuth ? (
          <Container>
            <div className="dashboard">
              <div className="welcome-text">
                <h2>Welcome {firstName}</h2>
                <p>You are doing great, keep learning</p>
              </div>
              <div className="profile">
                <div className="profile-info rounded">
                  <div className="profile-image col-4">
                    <img
                      src="https://img.freepik.com/free-photo/young-student-woman-wearing-denim-jacket-eyeglasses-holding-colorful-folders-showing-thumb-up-pink_176532-13861.jpg?size=626&ext=jpg"
                      alt="profile-image"
                    />
                  </div>

                  <div className="profile-data col-8">
                    <p>
                      <span>Profile Name</span> <span>{name}</span>
                    </p>
                    <p>
                      <span>Email Address</span> <span>{email}</span>
                    </p>
                    <p>
                      <span>Country</span> <span>India</span>
                    </p>
                    <p>
                      <span>Telephone Number</span> <span>+123 452369758</span>
                    </p>
                  </div>
                </div>
                <div className="profile-greet">
                  <span>CONGRATULATIONS</span>
                  <h1 className="name">Chris</h1>
                  <span>You have saved</span>
                  <h1>$500</h1>
                </div>
              </div>
              <div className="test-score">
                <h2 className="pl-2">My Test Score</h2>
                <div className="score-wrapper">
                  <div className="score-card">
                    <h4>7.5</h4>
                    <p>IELTS SCORE</p>
                  </div>

                  <div className="score-card">
                    <h4>9.2</h4>
                    <p>IELTS SCORE</p>
                  </div>

                  <div className="score-card">
                    <h4>6.5</h4>
                    <p>IELTS SCORE</p>
                  </div>

                  <div className="score-card">
                    <h4>5.9</h4>
                    <p>IELTS SCORE</p>
                  </div>
                </div>
              </div>
              <div className="academic-info">
                <div className="head">
                  <h2>Academic Information</h2>
                  <span>ADD</span>
                </div>
                <div className="document">
                  <div
                    id="donut-chart"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <CircularProgressbar
                      value={82.2}
                      text={`${82.2}%`}
                      styles={buildStyles({
                        pathColor: "#00A3FF",
                        textColor: "#00A3FF",
                        // backgroundColor: "#ffffff",
                        trailColor: "#ffffff",
                      })}
                    />
                  </div>
                  <ul className="document-info">
                    <li>
                      <span>Level :</span> Primary School
                    </li>
                    <li>
                      <span>Institution:</span>Graded English Medium School
                    </li>
                    <li>
                      <span>Passed Year:</span> 2073
                    </li>{" "}
                    <li className="view-document">
                      {" "}
                      <Link href="">View Document </Link>
                    </li>
                  </ul>
                </div>
                <div className="document">
                  <div
                    id="donut-chart"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <CircularProgressbar
                      value={78.2}
                      text={`${78.2}%`}
                      styles={buildStyles({
                        pathColor: "#00A3FF",
                        textColor: "#00A3FF",
                        // backgroundColor: "#ffffff",
                        trailColor: "#ffffff",
                      })}
                    />
                  </div>
                  <ul className="document-info">
                    <li>
                      <span>Level :</span> Secondary School
                    </li>
                    <li>
                      <span>Institution:</span>United Academy
                    </li>
                    <li>
                      <span>Passed Year:</span> 2073
                    </li>{" "}
                    <li className="view-document">
                      {" "}
                      <Link href="">View Document </Link>
                    </li>
                  </ul>
                </div>
                <div className="document">
                  <div
                    id="donut-chart"
                    style={{ width: "70px", height: "70px" }}
                  >
                    <CircularProgressbar
                      value={88.3}
                      text={`${88.3}%`}
                      styles={buildStyles({
                        pathColor: "#00A3FF",
                        textColor: "#00A3FF",
                        // backgroundColor: "#ffffff",
                        trailColor: "#ffffff",
                      })}
                    />
                  </div>
                  <ul className="document-info">
                    <li>
                      <span>Level :</span> College
                    </li>
                    <li>
                      <span>Institution:</span>Trinity International College
                    </li>
                    <li>
                      <span>Passed Year:</span> 2076
                    </li>{" "}
                    <li className="view-document">
                      {" "}
                      <Link href="">View Document </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="work-experience">
                <div className="head">
                  <h2>Work Experience</h2>
                  <span>ADD</span>
                </div>
                <div className="experience border-bottom">
                  <h4 className="sn-index">1.</h4>
                  <div className="experience-post">
                    <h4>Intern</h4>
                    <p>ABC SoftTech Company</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="experience border-bottom">
                  <h4 className="sn-index">2.</h4>
                  <div className="experience-post">
                    <h4>Junior Front-End Developer</h4>
                    <p>ABC SoftTech Company</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
                <div className="experience">
                  <h4 className="sn-index">3.</h4>
                  <div className="experience-post">
                    <h4>Mid-Level Developer</h4>
                    <p>ABC SoftTech Company</p>
                    <p>Kathmandu, Nepal</p>
                  </div>
                </div>
              </div>
              <div className="travel-history">
                <div className="head">
                  <h2>Travel History</h2>
                  <span>ADD</span>
                </div>
                <p>No Travel History Found</p>
              </div>
              <div className="passport">
                <h2>Passport</h2>

                <div className="add-docs">
                  <span className="add-type">
                    {/* icon here */}
                    <img src="/images/pdf.png" alt="download pdf" />
                  </span>
                  <span className="add-button">
                    <AiOutlinePlus className="plus-icon" />
                  </span>
                </div>
              </div>
              <div className="skills">
                <div className="head">
                  <h2>Skills</h2>
                  <span>ADD</span>
                </div>

                <div className="skills-wrapper">
                  <span className="skill">Front-end Development</span>
                  <span className="skill">Back-end Development</span>
                  <span className="skill">Web Design</span>
                  <span className="skill">Dev Ops</span>
                  <span className="skill">Database Management</span>
                </div>
              </div>
            </div>
          </Container>
        ) : (
          <p
            style={{
              width: "100%",
              height: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Restricted, please login first...
          </p>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Dashboard;

export async function getServerSideProps(context) {
  const session = await getSession(context);
  return {
    props: {
      session,
      name: session?.user?.name,
      email: session?.user?.email,
    },
  };
}

import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Tag } from "antd";
import styles from "../styles/Dashboard.module.scss";
import HeaderBar from "../components/HeaderBar";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import axiosInstance from "../api/interceptor";

interface TimesheetHour {
  timeSheetHoursId: string | null;
  timeSheetHoursDetails: string;
  timeSheetHours: number;
  hoursType: string;
}

interface TimesheetDay {
  timeSheetDate: string;
  timeSheetDateHours: string;
  isWeekDays: boolean;
  timesheetHours: TimesheetHour[];
}

interface TimesheetDetail {
  intervalNameStatus: string;
  projectName: string;
  clientName: string;
  status: string;
  totalHours: string;
  timesheetDays: TimesheetDay[];
}

interface ProjectData {
  projectId: string;
  timesheetDetails: TimesheetDetail[];
}

interface Props {
  data: { project: ProjectData[] };
}

const ProjectTimesheet: React.FC = () => {
  const [activeProject, setActiveProject] = useState(0)
  const [totalHours, setTotalHours] = useState(0)
  const [pendingApproval, setPendingApproval] = useState(0)
  const navigate = useNavigate()
  const { company } = useUser();
  const handleProjectClick = () => {
    navigate(`/${company}/project`)
  }
  const [data, setData] = useState<Props['data']>({ project: [] });
  useEffect(() => {
    const fetchTimeSheetData = async () => {
      const response = await axiosInstance.get(`/salesforce/timesheet?userId=0034W00002GWtiBQAT`);
      setData(response.data)
      setActiveProject(2)
      setTotalHours(20)
      setPendingApproval(1)
    }
    
    fetchTimeSheetData()

  }, [])
  return (
    <Layout className={styles.container}>
      <HeaderBar />
      <div className={styles.projectTimesheetContainer}>
        <h1>Project Timesheet</h1>
        <p>Manage your timesheets and track project hours</p>

        <div className={styles.CardContainer}>
          <Card key="ActiveProject" className={styles.timesheetCard}>
            <p>Active Project</p>
            <div className={styles.CardKPI}>{activeProject}</div>
          </Card>

          <Card key="TotalHours" className={styles.timesheetCard}>
            <p>Total Hours This Month</p>
            <div className={styles.CardKPI}>{totalHours}</div>
          </Card>

          <Card key="PendingApproval" className={styles.timesheetCard}>
            <p>Pending Approvals</p>
            <div className={styles.CardKPI}>{pendingApproval}</div>
          </Card>

        </div>
        <div className={styles.TimesheetCardContainer}>
          <div className={styles.RecentProject}>
            <h2>Recent Projects</h2>
            <Button className={styles.backBtn} onClick={handleProjectClick}>
              View All Projects
            </Button>
          </div>
          {data.project.flatMap((project, idx) =>
            project.timesheetDetails.map((detail, index) => (
              <Card key={`${idx}-${index}`} className={styles.timesheetCard}>
                <div className={styles.timesheetInfo}>
                  <div>
                    <h3>{detail.projectName}</h3>
                    <p>Daily Hours & Details with Attachment</p>
                    <p>Duration: {detail.intervalNameStatus}</p>
                  </div>
                  <div className={styles.timesheetStatus}>
                    <div className={styles.timesheetKPI}>
                      <p ><strong className={styles.totalHours}>{detail.totalHours}</strong> </p>
                      <Tag color={detail.status === "New" ? "blue" : "green"}>
                        {detail.status}
                      </Tag>

                    </div>
                    <Button className={styles.blackButton}>Open</Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>

      </div>
    </Layout>
  );
};

export default ProjectTimesheet;

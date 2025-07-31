import React, { useEffect, useState } from "react";
import { Button, Card, Layout, Tag } from "antd";
import styles from "../styles/Projects.module.scss";
import HeaderBar from "../components/HeaderBar";
import { ArrowLeftOutlined } from "@ant-design/icons";
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
  const navigate=useNavigate()
  const { company } = useUser();
  const handleBackClick=()=>{
    navigate(`/${company}/dashboard`)
  }
  const [data, setData] = useState<Props['data']>({ project: [] });
  useEffect(() => {
    const fetchTimeSheetData = async () => {
      const response = await axiosInstance.get(`/salesforce/timesheet?userId=0034W00002GWtiBQAT`);
      setData(response.data)
    }
    
    fetchTimeSheetData()

  }, [])
  return (
    <Layout className={styles.container}>
      <HeaderBar />

      <div className={styles.projectTimesheetContainer}>
        <Button className={styles.backBtn} onClick={handleBackClick}>
          <ArrowLeftOutlined />
          Back To Dashboard
        </Button>
        <h1>Project Timesheet</h1>
        <p>Select a project to manage timesheets</p>
        <div className={styles.CardContainer}>
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
                  <p>Total Hours</p>
                  <p><strong>{detail.totalHours}</strong> </p>
                </div>
                <div className={styles.timesheetStatus}>
                  <div className={styles.timesheetKPI}>
                  <p  className={styles.timesheetStatusKPI}>Status</p>
                    <Tag color={detail.status === "New" ? "blue" : "green"}>
                      {detail.status}
                    </Tag>
                  
                </div>
                </div>
                <div className={styles.timesheetKPI}>
                  <p>Non Billable Hours</p>
                  <p>
                    <strong>
                    {
                      detail.timesheetDays.reduce((total, day) => {
                        const nonBillable = day.timesheetHours
                          .filter((hour) => hour.hoursType !== "Billable")
                          .reduce((sum, hour) => sum + hour.timeSheetHours, 0);
                        return total + nonBillable;
                      }, 0) || 0
                    }
                    </strong>
                  </p>
                </div>
                <Button className={styles.blackButton}>Open Timesheet</Button>
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

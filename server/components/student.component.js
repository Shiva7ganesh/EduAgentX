

export const getStudentDetails = async (req, res) => {
    try {
    const response = await fetch(
      "https://cloud.uipath.com/eduautomaters/defaulttenant/dataservice_/api/EntityService/Studenttable/read",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.UI_PATH_DASH_TOKEN}`,
          "Content-Type": "application/json",
        },
      }

    );
    const result = await response.json();
    const studentData = result.value.map(student => ({
        studentName : student.Studentname,
        studentId : student.Studentid
    }))
    return res.json(
      { status: "success", studentData }
    );
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return res
      .status(500)
      .json({ status: "error", error: "Failed to fetch dashboard data" });
  }
}

export const sendStudentDetails = async (req, res) => {

  const details = req.body;


  // checking if the student is already present in the database at the same date
  const selectedDate = [ ...new Set(details.attendanceData.map(student => student.attdate))][0];

  try {
    const response = await fetch('https://cloud.uipath.com/eduautomaters/defaulttenant/dataservice_/api/EntityService/AttendenceTable/query', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.UI_PATH_DASH_TOKEN}`,
      },
      body: JSON.stringify({
        "selectedFields": [
          "stdid",
          "studentemail"
        ],
        "filterGroup": {
          "logicalOperator": 0,
          "queryFilters": [
            {
              "fieldName": "attdate",
              "operator": "=",
              "value": selectedDate
            }
          ],
          "filterGroups": []
        },
        "start": 0,
        "limit": 100
      }
      )
    })
    const result = await response.json();
    if(result?.totalRecordCount && result?.totalRecordCount > 0){
      return res.json({
        status: "error",
        message: "Attendance already marked for this date",
        data: result
      })
    }
  } catch (error) {
    console.error("Error fetching attendance data:", error);
    return res.status(500).json({
      status: "error",
      error: "Failed to fetch attendance data",
    });
  }
  console.log("Attendance data received successfully");
  try {
    const response = await fetch("https://cloud.uipath.com/eduautomaters/defaulttenant/dataservice_/api/EntityService/AttendenceTable/insert-batch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.UI_PATH_DASH_TOKEN}`,
      },
      body: JSON.stringify(details.attendanceData)
    });

    const result = await response.json();

    return res.json({
    status: "success",
    message: "Attendance data received successfully",
    data: result
  }).status(200);

  } catch (error) {
    console.error("Error submitting attendance:", error);
    return res.status(500).json({
      status: "error",
      error: "Failed to submit attendance",
    });
  }

  


}
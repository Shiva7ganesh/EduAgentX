

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
import React from 'react'

const StudentAttendanceTable = (
  {
    studentData = []
  }
) => {

  const chooseBadge = ( isPresent ) => {
    if(isPresent === undefined){
      return (<span className='rounded-full py-2 px-3 flex gap-1 text-xs bg-amber-100 justify-center items-center'>
        <span className='w-1 h-1 rounded-full bg-amber-500 inline-block'></span> <span className='text-amber-500'>Not Marked</span>
      </span>)
    }
    else if(isPresent){
      return (<span className='rounded-full py-2 px-3 flex gap-1 text-xs bg-green-100 justify-center items-center'>
        <span className='w-1 h-1 rounded-full bg-green-500 inline-block'></span> <span className='text-green-500'>Present</span>
      </span>)
    }
    else{
      return (<span className='rounded-full py-2 px-3 flex gap-1 text-xs bg-red-100 justify-center items-center'>
        <span className='w-1 h-1 rounded-full bg-red-500 inline-block'></span> <span className='text-red-500'>Absent</span>
      </span>)
    }
  };

  return (
    <div className='p-4 w-full'>
      <table className='w-full'>
        <thead className='w-full text-sm mb-3 bg-blue-700  text-white rounded-lg flex justify-around items-center'>
          <tr className='w-full text-sm rounded-lg flex justify-around items-center'>
            <th className='py-4 justify-center flex w-full'>
            S.No
          </th>
          <th className='py-3 flex pl-24 w-full'>
            Student Name
          </th>
          <th className='py-3 flex w-full justify-center'>
            Registration Number
          </th>
          <th className='py-3 flex w-full justify-center'>
            Status
          </th>
          </tr>
        </thead>
        <tbody className='w-full'>
          {
            studentData && studentData.map((std, idx) => (<tr key={idx} className='flex font-semibold text-neutral-900 text-xs items-center w-full border-b-2 border-b-zinc-200 justify-around '>
            <td className='py-3 flex w-full justify-center'>
              {idx + 1}
            </td>
            <td className='py-3 flex w-full pl-28'>
              {std.student_name}
            </td>
            <td className='py-3 uppercase flex w-full justify-center'>
              {std.student_id}
            </td>
            <td className='py-3 flex w-full justify-center'>
              { chooseBadge(std.isPresent) }
            </td>
          </tr>))
          }
        </tbody>
        
      </table>
    </div>
  )
}

export default StudentAttendanceTable
import React from "react";
import PageHeaderWithSearch from "../../components/PageHeaderWithSearch";
import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "../../components/CategoryTable";

const ClassesPage = () => {
  const saveClass = (classData) => {
    console.log(classData);
  };
  return (
    <div>
      <PageHeaderWithSearch
        title='Classes'
        subtitle='Manage all class/grade categories here.'
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
        <div className='col-span-1'>
          <CategoryForm
            title='Add New Class Category'
            submitForm={saveClass}
          />
        </div>
        <div className='col-span-2'>
          <h6 className='text-md font-semibold mb-3'>Class Categories</h6>
          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;

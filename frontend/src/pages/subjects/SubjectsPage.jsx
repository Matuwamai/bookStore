import React from "react";
import PageHeaderWithSearch from "../../components/PageHeaderWithSearch";
import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "../../components/CategoryTable";

const SubjectsPage = () => {
  const saveSubject = (subjectData) => {
    console.log(subjectData);
  }
  return (
    <div>
      <PageHeaderWithSearch
        title='Subjects'
        subtitle='Manage all subject categories here.'
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
        <div className='col-span-1'>
          <CategoryForm title='Add New Subject Category' submitForm={saveSubject} />
        </div>
        <div className='col-span-2'>
          <h6 className='text-md font-semibold mb-3'>Subject Categories</h6>
          <CategoryTable />
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;

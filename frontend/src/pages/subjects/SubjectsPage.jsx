import React, { useEffect } from "react";
import PageHeaderWithSearch from "../../components/PageHeaderWithSearch";
import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "../../components/CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import { createCategory, fetchCategories } from "../../store/actions/categoryActions";
import { toast } from "react-toastify";

const SubjectsPage = () => {
  const dispatch = useDispatch();
  const saveSubject = (subjectData) => {
    dispatch(createCategory(subjectData, "subject"))
  }

    const { success, subjects } = useSelector((state) => state.category);


    useEffect(() => {
      dispatch(fetchCategories("subject"));
    }, [dispatch, success]);

    useEffect(() => {
      if (success) {
        toast.success("Subject category created successfully");
      }
    }, [success])
  return (
    <div>
      <PageHeaderWithSearch
        title='Subjects'
        subtitle='Manage all subject categories here.'
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
        <div className='col-span-1'>
          <CategoryForm
            title='Add New Subject Category'
            submitForm={saveSubject}
          />
        </div>
        <div className='col-span-2'>
          <h6 className='text-md font-semibold mb-3'>Subject Categories</h6>
          <CategoryTable data={subjects} />
        </div>
      </div>
    </div>
  );
};

export default SubjectsPage;

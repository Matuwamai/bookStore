import React, { useEffect } from "react";
import PageHeaderWithSearch from "../../components/PageHeaderWithSearch";
import CategoryForm from "../../components/CategoryForm";
import CategoryTable from "../../components/CategoryTable";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  fetchCategories,
} from "../../store/actions/categoryActions";
import { toast } from "react-toastify";

const ClassesPage = () => {
  const dispatch = useDispatch();
  const { success, classes } = useSelector((state) => state.category);
  const saveClass = (classData) => {
    dispatch(createCategory(classData, "class"));
  };

  useEffect(() => {
    dispatch(fetchCategories("class"));
  }, [dispatch, success]);

  useEffect(() => {
    if (success) {
      toast.success("Subject category created successfully");
    }
  }, [success]);
  return (
    <div>
      <PageHeaderWithSearch
        title='Classes'
        subtitle='Manage all class/grade categories here.'
      />
      <div className='grid grid-cols-1 lg:grid-cols-3 gap-4 border-t border-gray-200 pt-4'>
        <div className='col-span-1'>
          <CategoryForm title='Add New Class Category' submitForm={saveClass} />
        </div>
        <div className='col-span-2'>
          <h6 className='text-md font-semibold mb-3'>Class Categories</h6>
          <CategoryTable data={classes} />
        </div>
      </div>
    </div>
  );
};

export default ClassesPage;

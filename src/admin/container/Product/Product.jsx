import React, { useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FieldArray, Form, Formik } from "formik";
import { object, string, mixed } from 'yup';
import MyTextField from "../../components/MyTextField";
import { BorderBottom, Margin, Padding, WidthNormal } from "@mui/icons-material";
import { useAddCategoryMutation, useDeleteCategoryMutation, useGetCategoryQuery, useUpdateCategoryMutation } from "../../../redux/api/category.api";
import { DataGrid } from '@mui/x-data-grid';
import { Avatar, Box, Checkbox, FormControl, FormControlLabel, IconButton, InputLabel, ListItemText, MenuItem, OutlinedInput, Select } from "@mui/material";
import { CiEdit } from "react-icons/ci";
import { MdOutlineModeEdit } from "react-icons/md";
import { MdDeleteOutline } from "react-icons/md";
import Myuploadfile from "../../components/Myuploadfile";
import { useAddProductMutation, useDeleteProductMutation, useEditProductMutation, useGetProductQuery } from "../../../redux/api/product.api";
import { asyncThunkCreator } from "@reduxjs/toolkit";
import { IMG_URL } from "../../../utility/url";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';


const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    slotProps: {
        paper: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    },
};

function Product() {

    const [checked, setChecked] = React.useState(false);
    const [open, setOpen] = React.useState(false);
    const [updatedata, setUpdatedata] = useState({});
    const [variants, setVariants] = useState([
        { color: "#000000", images: [], size: [] }
    ]);
    //const [sizeName, setSizeName] = React.useState([]);


    const { data: catdata,
        error: caterror,
        isLoading: catisLoading } = useGetCategoryQuery();

    const { data, error, isLoading } = useGetProductQuery();
    console.log(data)
    const [addProduct] = useAddProductMutation();
    const [updateProduct] = useEditProductMutation();
    const [deleteProduct] = useDeleteProductMutation();


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     const formData = new FormData(event.currentTarget);
    //     const formJson = Object.fromEntries(formData.entries());
    //     const email = formJson.email;
    //     console.log(email);
    //     handleClose();
    // };

    const categorySchema = object({
        category_id: string().required(),
        name: string().required(),
        price: string().required(),
        product_img: mixed(),

        //discount: string().required()

    })

    let pdata = [
        { value: '', label: 'Select Category' }
    ]


    catdata?.data?.map((v, i) => {
        console.log(v?._id)
        pdata.push({ value: v?._id, label: v?.name })
    })

    let sizedata = [

        { value: 'Free_Size', label: 'Free Size' },
        { value: 'XS', label: 'XS' },
        { value: 'S', label: 'S' },
        { value: 'M', label: 'M' },
        { value: 'L', label: 'L' },
        { value: 'XL', label: 'XL' },
    ]

    // const handleChange = (event) => {
    //     const {
    //         target: { value },
    //     } = event;
    //     setSizeName(
    //         // On autofill we get a stringified value.
    //         typeof value === 'string' ? value.split(',') : value,
    //     );
    // };

    // console.log(sizeName)



    const handlesubmit = async (values) => {
        console.log("values", values.product_img, values)

        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("price", values.price);
        formData.append("category_id", values.category_id);
        // formData.append("size", values.size);
        //formData.append("discount", values.discount);
        // formData.append("color", values.color)

        formData.append("variants", JSON.stringify(values.variants));

        values.variants.forEach((variant, i) => {
            variant.images.forEach((file) => {
                formData.append(`variant_images_${i}`, file);
            });
        });

        formData.append("size", JSON.stringify(values.size));

        // if (Array.isArray(values.product_img)) {
        //     values.product_img.forEach((file) => {
        //         formData.append("product_img", file);
        //     });
        // }

        console.log("values", formData.get("name"))


        if (values._id) {
            formData.append("_id", values._id);
            console.log("updateval", values)
            updateProduct(formData)
        } else {
            try {
                console.log("CALLING API...");
                const res = await addProduct(formData);
                console.log("API RESPONSE", res);
            } catch (err) {
                console.log("API ERROR", err);
            }
        }
    }

    const handleedit = (values) => {
        setUpdatedata(values)
        handleClickOpen()
        console.log("updatedata", updatedata)
    }
    console.log("updatedata", updatedata)

    const handledelete = (_id) => {
        deleteProduct(_id);
    }

    const columns = [
        { field: 'name', headerName: 'name', width: 250 },
        {
            field: 'price',
            headerName: 'Price',
            width: 150,
            editable: true,
        },
        // {
        //     field: 'discount',
        //     headerName: 'Discount',
        //     width: 150,
        //     editable: true,
        // },
        {
            field: 'category_id',
            headerName: 'Category',
            width: 250,
            editable: true,
            renderCell: (params) => (
                <>
                    {
                        //console.log(params)
                        params.row.parentcategory_id !== null ? catdata?.data?.find((v) => v._id === params.row.category_id)?.name : '-'
                    }
                </>
            )
        },//product_img

        {
            field: 'product_img',
            headerName: 'Images',
            width: 470,
            editable: true,
            renderCell: (params) => (
                <>
                    {
                        params?.row?.variants.map((v, i) => (
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                {
                                    v.color ?
                                        <Avatar sx={{ bgcolor: v.color, height: '20px', width: '20px' }}> </Avatar>
                                        : ''
                                }
                                {
                                    // console.log("img",params)
                                    v.images?.map((v) => (
                                        <img src={IMG_URL + v} alt="productsimg" style={{ marginRight: '10px', objectFit: 'cover', height: '100%', width: '70px' }} />
                                    ))
                                }
                            </Box>
                        ))
                    }


                </>
            )
        },
        {
            field: '',
            headerName: 'Action',
            width: 120,
            editable: true,
            renderCell: (params) => (
                <>
                    <IconButton aria-label="edit" onClick={(e) => handleedit(params.row)}>
                        <MdOutlineModeEdit />
                    </IconButton>

                    <IconButton aria-label="delete" onClick={(e) => handledelete(params.row._id)}>
                        <MdDeleteOutline />
                    </IconButton>
                </>
            )
        }
    ];

    console.log("variants", variants)


    return (
        <>
            <div className="container">
                <React.Fragment>
                    <Button variant="outlined" onClick={handleClickOpen}>
                        Add Product
                    </Button>
                    <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>Add Category</DialogTitle>
                        <DialogContent>
                            <Formik
                                enableReinitialize
                                initialValues={Object.keys(updatedata).length > 0 ? updatedata : {
                                    name: '',
                                    price: '',
                                    category_id: "",

                                    variants: [
                                        {
                                            color: "",
                                            images: [],
                                            size: [],
                                            isFlashSale: false,
                                            flashPrice: "",
                                            flashStart: "",
                                            flashEnd: ""
                                        }
                                    ]
                                }}
                                validationSchema={categorySchema}
                                onSubmit={(values) => {
                                    console.log("valuesvalues", values)
                                    handlesubmit(values)
                                    handleClose();
                                }}
                            >
                                {({ values, setFieldValue }) => (
                                    <Form id="subscription-form">

                                        <MyTextField
                                            name="category_id"
                                            id="category_id"
                                            label="category"
                                            select
                                            data={pdata}
                                            slotProps={{
                                                select: {
                                                    native: true,
                                                },
                                            }}
                                            InputLabelProps={{ shrink: true }}
                                        />

                                        <MyTextField
                                            name="name"
                                            id="name"
                                            label="Product Name"
                                        />

                                        <MyTextField
                                            name="price"
                                            id="price"
                                            label="Price"
                                        />


                                        {/* <MyTextField
                                            name="discount"
                                            id="discount"
                                            label="Discount"
                                        /> */}

                                        <FieldArray name="variants">
                                            {({ push, remove }) => (
                                                <>
                                                    {
                                                        values.variants.map((v, index) => (
                                                            <>
                                                                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
                                                                    <MyTextField
                                                                        name={`variants[${index}].color`}  // ✅ dynamic name
                                                                        type="color"
                                                                        InputProps={{ disableUnderline: true }}

                                                                        label="color"

                                                                        value={v.color}
                                                                        sx={{
                                                                            width: "30px", '& .MuiInputBase-input-MuiInput-input': {
                                                                                Padding: 0
                                                                            }
                                                                        }}

                                                                    />

                                                                    <Myuploadfile
                                                                        name={`variants[${index}].images`}

                                                                    />

                                                                    {index !== 0 && (
                                                                        <Button
                                                                            color="error"
                                                                            onClick={() => remove(index)}
                                                                            sx={{ height: 'fit-content' }}
                                                                        >
                                                                            Remove
                                                                        </Button>
                                                                    )}

                                                                </Box>

                                                                {/* <MyTextField
                                                                    name={`variants[${index}].size`}
                                                                    id="size"
                                                                    label="size"
                                                                    select
                                                                    data={sizedata}
                                                                    slotProps={{
                                                                        select: {
                                                                            native: true,
                                                                            multiple:true
                                                                        },
                                                                    }}
                                                                     //multiple={true}
                                                                    InputLabelProps={{ shrink: true }}
                                                                    sx={{ mt: 2, mb: 2 }}
                                                                /> */}
                                                                <FormControl sx={{ m: 1, width: 300 }}>
                                                                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                                                                    <Select
                                                                        labelId="demo-multiple-checkbox-label"
                                                                        id="demo-multiple-checkbox"
                                                                        multiple
                                                                        value={values.variants[index].size || []}
                                                                        onChange={(event) => {
                                                                            const value = event.target.value;

                                                                            const finalValue =
                                                                                typeof value === "string" ? value.split(",") : value;

                                                                            // ✅ update specific variant
                                                                            setFieldValue(`variants[${index}].size`, finalValue);
                                                                        }}
                                                                        input={<OutlinedInput label="Tag" />}
                                                                        renderValue={(selected) => selected.join(', ')}
                                                                        MenuProps={MenuProps}
                                                                    >
                                                                        {sizedata.map((v) => {
                                                                            const selected = (values.variants[index].size || []).includes(v.value);
                                                                            const SelectionIcon = selected ? CheckBoxIcon : CheckBoxOutlineBlankIcon;

                                                                            return (
                                                                                <MenuItem key={v.value} value={v.value}>
                                                                                    <SelectionIcon
                                                                                        fontSize="small"
                                                                                        style={{ marginRight: 8, padding: 9, boxSizing: 'content-box' }}
                                                                                    />
                                                                                    <ListItemText primary={v.label} />
                                                                                </MenuItem>
                                                                            );
                                                                        })}
                                                                    </Select>
                                                                </FormControl>

                                                                <FormControlLabel
                                                                    control={
                                                                        <Checkbox
                                                                            checked={values.variants[index].isFlashSale || false}
                                                                            onChange={(e) =>
                                                                                setFieldValue(
                                                                                    `variants[${index}].isFlashSale`,
                                                                                    e.target.checked
                                                                                )
                                                                            }
                                                                           
                                                                        />
                                                                    }
                                                                    label="Enable Flash Sale"
                                                                     sx={{display:'block'}}
                                                                />
                                                                {values.variants[index].isFlashSale && (
                                                                    <>
                                                                        <MyTextField
                                                                            name={`variants[${index}].flashPrice`}
                                                                            placeholder="Flash Price"
                                                                        />

                                                                        <MyTextField
                                                                            type="datetime-local"
                                                                            name={`variants[${index}].flashStart`}
                                                                        />

                                                                        <MyTextField
                                                                            type="datetime-local"
                                                                            name={`variants[${index}].flashEnd`}
                                                                        />
                                                                    </>
                                                                )}
                                                            </>
                                                        ))
                                                    }
                                                    < Button
                                                        variant="outlined"
                                                        onClick={() => push({ color: "#000000", images: [] })}
                                                        sx={{ marginTop: 2 }}
                                                    >
                                                        + Add Color
                                                    </Button>
                                                </>
                                            )}
                                        </FieldArray>

                                    </Form>
                                )}
                            </Formik>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button type="submit" form="subscription-form">
                                Add Product
                            </Button>
                        </DialogActions>
                    </Dialog>
                </React.Fragment>


                <DataGrid
                    rows={data?.data}
                    getRowId={(rows) => rows?._id || Math.random()}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 10,
                            },
                        },
                    }}
                    rowHeight={150}
                    pageSizeOptions={[5, 10, 15, 20]}
                    checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                        marginTop: 2, marginBottom: 1,
                        '& .MuiDataGrid-columnSeparator': {
                            display: 'none',
                        },
                        '& .MuiDataGrid-menuIcon, & .MuiDataGrid-iconButtonContainer': { display: 'none' },
                    }}
                />
            </div >
        </>
    )
}

export default Product;
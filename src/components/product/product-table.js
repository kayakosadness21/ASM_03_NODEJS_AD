import classes from "./product-table.module.css";
// Tiêu chí số 10: Tạo được Dashboard để hiển thị danh sách các sản phẩm hiện có
const ProductTable = (props) => {
  const products = props.products;
  const updateHandler = (productId) => {
    props.crud("update", productId);
  };
  const deleteHandler = (productId) => {
    props.crud("delete", productId);
  };

  // Lập từng dòng dl trong bảng
  const tableData =
    products &&
    products.map((item, index) => {
      const pathImage = item?.images[0].includes("/images/multiple_images")
        ? process.env.REACT_APP_DOMAIN + item?.images[0]
        : item?.images[0];
      return (
        <tr key={index}>
          <td>{item._id}</td>
          <td className={classes.product}>{item.name}</td>
          <td className={classes.price}>
            {Intl.NumberFormat("vi").format(Number(item.price))}
          </td>
          <td>
            <img src={pathImage} alt={item.name} />
          </td>
          <td>{item.category}</td>
          <td className={classes.edit}>
            <span
              className={classes.update}
              onClick={updateHandler.bind(null, item._id)}
            >
              Update
            </span>
            <span
              className={classes.delete}
              onClick={deleteHandler.bind(null, item._id)}
            >
              Delete
            </span>
          </td>
        </tr>
      );
    });

  return (
    <>
      {/* Bảng SF */}
      <table className={classes["cart-table"]}>
        <thead>
          <tr className={classes.header}>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th width="8%">Image</th>
            <th>Category</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </>
  );
};
export default ProductTable;

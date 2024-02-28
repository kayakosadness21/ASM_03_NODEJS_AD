import classes from "./order-table-detail.module.css";

const OrderTableDetail = (props) => {
  const products = props.products;

  // create data row inside table
  const tableData = products.map((item, index) => {
    return (
      <tr key={index}>
        <td>{item.product_id._id}</td>
        <td>
          <img src={item.product_id.images[0]} alt={item.product_id.name} />
        </td>
        <td className={classes.product}>{item.product_id.name}</td>
        <td className={classes.price}>
          {Intl.NumberFormat("vi").format(Number(item.product_id.price))} VND
        </td>
        <td>{item.quantity}</td>
      </tr>
    );
  });

  return (
    <>
      {/* Table */}
      <table className={classes["cart-table"]}>
        <thead>
          <tr className={classes.header}>
            <th>ID PRODUCT</th>
            <th width="15%">IMAGE</th>
            <th>PRODUCT</th>
            <th>PRICE</th>
            <th>COUNT</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </>
  );
};
export default OrderTableDetail;

import { Button, Card, Col, Descriptions, Row } from "antd";
import { useNavigate } from "react-router-dom";
import bgimage from "../assets/images/image-statue@2x.png";

const Event = ({ key, event }) => {
  const { id, title, date, location, description } = event;
  const navigate = useNavigate();
  const handleclick = () => {
    navigate(`/events/${id}/participants`);
  };
  const goToScan = () => {
    navigate(`/events/${id}/scan`);
  };
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const formatDate2 = (dateString) => {
    const options = {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const eventDate = formatDate2(date);
  const today = new Date().toLocaleDateString();
  console.log("datesss", eventDate, today);
  const isToday = (someDate) => {
    return eventDate === today;
  };
  const deletebtn = [
    <svg
      width="16"
      height="16"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 2C8.62123 2 8.27497 2.214 8.10557 2.55279L7.38197 4H4C3.44772 4 3 4.44772 3 5C3 5.55228 3.44772 6 4 6L4 16C4 17.1046 4.89543 18 6 18H14C15.1046 18 16 17.1046 16 16V6C16.5523 6 17 5.55228 17 5C17 4.44772 16.5523 4 16 4H12.618L11.8944 2.55279C11.725 2.214 11.3788 2 11 2H9ZM7 8C7 7.44772 7.44772 7 8 7C8.55228 7 9 7.44772 9 8V14C9 14.5523 8.55228 15 8 15C7.44772 15 7 14.5523 7 14V8ZM12 7C11.4477 7 11 7.44772 11 8V14C11 14.5523 11.4477 15 12 15C12.5523 15 13 14.5523 13 14V8C13 7.44772 12.5523 7 12 7Z"
        fill="#111827"
        className="fill-danger "
      ></path>
    </svg>,
  ];

  const pencil = [
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      key={0}
    >
      <path
        d="M13.5858 3.58579C14.3668 2.80474 15.6332 2.80474 16.4142 3.58579C17.1953 4.36683 17.1953 5.63316 16.4142 6.41421L15.6213 7.20711L12.7929 4.37868L13.5858 3.58579Z"
        className="fill-gray-7"
      ></path>
      <path
        d="M11.3787 5.79289L3 14.1716V17H5.82842L14.2071 8.62132L11.3787 5.79289Z"
        className="fill-gray-7"
      ></path>
    </svg>,
  ];
  return (
    <div className="">
      {/* <Card className=" " bordered={false} style={{ borderRadius: "10px" }}>
        <div className="flex">
          <div className="card-info">
            <Descriptions title={title}>
              <Descriptions.Item label="Company Name" span={3}>
                {title}
              </Descriptions.Item>
              <Descriptions.Item label="Address" span={3}>
                {location}
              </Descriptions.Item>
              <Descriptions.Item label="Date" span={3}>
                {formatDate(date)}
              </Descriptions.Item>
            </Descriptions>
            <div className="action-buttons">
              <Button type="link" danger>
                DELETE
              </Button>
              <Button type="link" className="darkbtn">
                EDIT
              </Button>
            </div>
          </div>
        </div>
      </Card> */}

      <Card className="custom-card " bordered={false}>
        <Row gutter={16}>
          {/* Left Side (Information) */}
          <Col xs={24} sm={16} md={16} lg={16} xl={16}>
            <div className="card-info">
              <Descriptions title={title}>
                <Descriptions.Item label="Company Name" span={3}>
                  {title}
                </Descriptions.Item>
                <Descriptions.Item label="Address" span={3}>
                  {location}
                </Descriptions.Item>
                <Descriptions.Item label="Date" span={3}>
                  {formatDate(date)}
                </Descriptions.Item>
              </Descriptions>
              <div className="action-buttons">
                <Button type="link" danger>
                  DELETE
                </Button>
                <Button type="link" onClick={handleclick} className="darkbtn">
                  EDIT
                </Button>
                {/* <Button type="link" onClick={goToScan} className="darkbtn">
                  Scan
                </Button> */}
                {isToday(formatDate(date)) && ( // Conditional rendering of the Scan button
                  <Button type="link" onClick={goToScan} className="darkbtn">
                    Scan
                  </Button>
                )}
              </div>
            </div>
          </Col>

          {/* Right Side (Image) */}
          <Col xs={24} sm={8} md={8} lg={8} xl={8}>
            <div className="card-image">
              <img
                src={`https://img.freepik.com/free-vector/gradient-abstract-logo_52683-8517.jpg?w=740&t=st=1704199356~exp=1704199956~hmac=f111ebc13be9600d1ae6b1e682141ce5eff3fde98d6428afadbf911280ab1a30`}
                alt="Company Logo"
              />
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default Event;

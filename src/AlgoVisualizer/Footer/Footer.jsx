import "./Footer.css";

function Footer(props) {
  const { title, desc, howItWorks, timeComp } = props;
  return (
    <div>
      <div className="desc">
        <div className="title">{title}</div>
        <div className="content">
          <div>{desc}</div>
          <div>
            <h4>How It Works</h4>
            {howItWorks}
          </div>
          <div>
            <h4>Time Complexity</h4>
            {timeComp}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

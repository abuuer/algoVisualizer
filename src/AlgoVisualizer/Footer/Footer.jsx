import "./Footer.css";

function Footer(props) {
  const { title, desc, howItWorks, timeComp } = props;
  return (
    <div>
      <div className="desc">
        <div className="title">{title}</div>
        <div className="content">
          <div dangerouslySetInnerHTML={{ __html: desc }}></div>
          <h4>How It Works</h4>
          <div dangerouslySetInnerHTML={{ __html: howItWorks }}></div>
          <h4>Time Complexity</h4>
          <div dangerouslySetInnerHTML={{ __html: timeComp }}></div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

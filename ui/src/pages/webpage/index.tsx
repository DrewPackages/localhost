import { Flex } from "antd";
import { useParams } from "react-router-dom";

export default function Webpage() {
  const { port } = useParams();
  return (
    <Flex>
      <iframe
        className="w-screen h-screen"
        title="Dapp"
        src={`http://localhost:${port}/`}
      ></iframe>
    </Flex>
  );
}

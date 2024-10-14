import { Space, Flex } from "antd";

export default function Webpage() {
  return (
    <Flex>
      <iframe
        className="w-screen h-screen"
        title="Dapp"
        src={"http://localhost:8080/"}
        ></iframe>
    </Flex>
  );
}

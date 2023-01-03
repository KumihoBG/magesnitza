import Form from "../Form/Form";
import Image from "next/image";
import { Container } from "../../styles/editStyles";

const Edit = () => {
  return (
    <Container>
      <Image
        rel="preload"
        as="image"
        src="/side-picture.png"
        alt="Side image"
        width={500}
        height={500}
        priority={true}
        sizes="(max-width: 500px) 100vw,
                (max-width: 500px) 50vw,
                33vw"
        quality={100}
        style={{
          position: "absolute",
          top: "25%",
          left: "15%",
          transform: "translate(-50%, -50%)",
        }}
      />
      <Form />
    </Container>
  );
};

export default Edit;

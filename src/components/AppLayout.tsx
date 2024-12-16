import "~/styles/custom-bootstrap.scss";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
import { type ReactNode } from "react";
import Container from "react-bootstrap/Container";

config.autoAddCss = false;

type AppLayoutProps = {
  children: ReactNode,
};

const AppLayout = ({
  children,
}: AppLayoutProps) => (
  <Container as="main" className="pt-3">
    {children}
  </Container>
);

export default AppLayout;

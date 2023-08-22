import type { Meta, StoryObj, Args } from "@storybook/react";
import { Source } from "@storybook/blocks";
import { useState } from "react";
import {
  ThemeProvider,
  ButtonCard,
  Modal,
  FabCard,
  Column,
  Row,
} from "@components";
import { HassConnect } from "@stories/HassConnectFake";

function Render(args?: Args) {
  return (
    <HassConnect hassUrl="http://localhost:8123">
      <ThemeProvider />
      <Row gap="1rem">
        <ButtonCard {...args} />
        <FabCard entity="light.fake_light_2" service="toggle" />
      </Row>
    </HassConnect>
  );
}

const exampleSetup = `
import { Modal } from '@hakit/components';
import { motion } from 'framer-motion';
import { useState } from 'react';
function CustomButton() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <-- The trigger element can be any motion element, in this case we use a FabCard which is a motion.button element -->
      <FabCard layoutId="custom-modal" onClick={() => setOpen(true)} icon="mdi:cog" />
      <Modal id="custom-modal" open={open} title="Settings" onClose={() => {
        setOpen(false);
      }}>
        Add your settings here!
      </Modal>
    </>
  );

}
`;

function RenderCustom() {
  const [open, setOpen] = useState(false);
  return (
    <HassConnect hassUrl="http://localhost:8123">
      <ThemeProvider />
      <Column gap="1rem">
        <Source dark code={exampleSetup} />
        <FabCard
          onClick={() => setOpen(true)}
          layoutId="custom-modal"
          icon="mdi:cog"
        />
        <Modal
          id="custom-modal"
          open={open}
          title="Settings"
          onClose={() => {
            setOpen(false);
          }}
        >
          Add your settings here!
        </Modal>
      </Column>
    </HassConnect>
  );
}
const exampleRenderByDomain = `
  import { ModalByEntityDomain, FabCard } from '@hakit/components';
  import { motion } from 'framer-motion';
  function CustomButton() {
    const [open, setOpen] = useState(false);
    return (
      <>
        <-- The trigger element can be any motion element, in this case we use a FabCard which is a motion.button element -->
        <FabCard layoutId="custom-modal" onClick={() => setOpen(true)} icon="mdi:cog" />
        <ModalByEntityDomain id="custom-modal" entity="light.fake_light_1" open={open} title="Settings" onClose={() => {
          setOpen(false);
        }} />
      </>
    );
  
  }
`;
function RenderModalByDomain() {
  return (
    <>
      <Column>
        <p>
          There's a helper component that will automatically load up pre-defined
          modals by entity/domain.
        </p>
        <p>
          If the entity you're using has no predefined layout, it won't render
          anything.
        </p>
        <p>
          Please note that this exact component is automatically wired up to the
          FabCard and ButtonCard when you long press on the buttons.
        </p>
        <Source dark code={exampleRenderByDomain} />
      </Column>
    </>
  );
}
export default {
  title: "COMPONENTS/Shared/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    centered: true,
  },
} satisfies Meta<typeof Modal>;
export type ModalStory = StoryObj<
  typeof ButtonCard<"light.fake_light_1", "toggle">
>;
export const ModalExample: ModalStory = {
  render: Render,
  args: {
    service: "toggle",
    title: "Office Downlight",
    entity: "light.fake_light_1",
  },
};

export const CustomModalExample: ModalStory = {
  render: RenderCustom,
  args: {},
};

export const ModalByDomain: ModalStory = {
  render: RenderModalByDomain,
  args: {},
};
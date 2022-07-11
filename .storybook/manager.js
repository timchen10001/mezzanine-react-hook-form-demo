import { addons } from '@storybook/addons';
import { create } from '@storybook/theming/create';

const theme = create({
  base: 'dark',
  brandTitle: 'Mezzanine React Hook Form Demo',
  brandUrl: 'https://github.com/timchen10001/mezzanine-react-hook-form-demo'
});

addons.setConfig({
  theme,
  panelPosition: 'bottom',
  sidebar: {
    showRoots: true,
  },
});

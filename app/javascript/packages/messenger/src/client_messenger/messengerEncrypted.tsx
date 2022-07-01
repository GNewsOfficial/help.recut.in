import ChaskiqMessenger from './messenger';

type ChaskiqMessengerProps = {
  lang: string;
  app_id: string;
  data: any;
  domain: string;
  ws: string;
  wrapperId?: string;
};
export default class ChaskiqMessengerEncrypted {
  props: ChaskiqMessengerProps;
  unload: () => void;
  sendCommand: (action: string, data: any) => void;

  constructor(props) {
    this.props = props;

    const messenger = new ChaskiqMessenger({
      app_id: this.props.app_id,
      encData: this.props.data,
      encryptedMode: true,
      domain: this.props.domain,
      ws: this.props.ws,
      wrapperId: this.props.wrapperId || 'ChaskiqMessengerRoot',
    })

    messenger.render();

    this.unload = () => {
      this.sendCommand('unload', {});
    };

    this.sendCommand = (action, data = {}) => {
      const event = new CustomEvent('chaskiq_events', {
        bubbles: true,
        detail: { action: action, data: data },
      });
      window.document.body.dispatchEvent(event);
    };
  }
}

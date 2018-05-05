'use babel';

import BotmasherEditorInfoView from './botmasher-editor-info-view';
import { CompositeDisposable, Disposable } from 'atom';

export default {

  subscriptions: null,

  activate(state) {
		this.subscriptions = new CompositeDisposable(
			atom.workspace.addOpener(uri => {
				if (uri === 'atom://botmasher-editor-info') {
					return new BotmasherEditorInfoView();
				}
			}),
			atom.commands.add('atom-workspace', {
				'botmasher-editor-info:toggle': () => this.toggle()
			}),
			new Disposable(() => {
				atom.workspace.getPaneItems().forEach(item => {
					if (item instanceof BotmasherEditorInfoView) {
						item.destroy();
					}
				});
			})
		);
	},

  deactivate() {
    this.subscriptions.dispose();
  },

  serialize() {
  },

  deserializeBotmasherEditorInfoView(serialized) {
    return new BotmasherEditorInfoView();
  },

  toggle() {
    atom.workspace.toggle('atom://botmasher-editor-info');
  }

};


import { Server } from 'miragejs';

export default () => {
    new Server({
		seeds(server) {
			server.db.loadData({});
		},
		routes() {
		}
    });
};

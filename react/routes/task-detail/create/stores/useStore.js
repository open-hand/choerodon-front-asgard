import { useLocalStore } from 'mobx-react-lite';

export default function useStore() {
  return useLocalStore(() => ({
    dsStore: [],
    get getDsStore() {
      return this.dsStore.slice();
    },
    setDsStore(data) {
      this.dsStore = data;
    },
  }));
}

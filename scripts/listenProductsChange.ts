import ExecutionEnvironment from '@docusaurus/ExecutionEnvironment';
import type { ClientModule } from '@docusaurus/types';

const module: ClientModule = {
  onRouteUpdate({ location }) {
    if (ExecutionEnvironment.canUseDOM) {
      // NOTE: 当显示其它产品时（非 Cloud），隐藏 API Reference
      if (!location.pathname.startsWith('/cloud')) {
        setTimeout(() => {
          const apiReferenceItem = <HTMLElement>document.querySelector(".navbar-cloud-api-reference")
          if (apiReferenceItem) {
            apiReferenceItem.style.display = "none";
          }
        }, 50)
      }
    }
  }
};
export default module;
/**
 * Datart
 *
 * Copyright 2021
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { useHistory } from 'react-router-dom';
import useQSLibUrlHelper from './useQSLibUrlHelper';

const useDrillThrough = () => {
  const history = useHistory();
  const { stringify } = useQSLibUrlHelper();

  const stringifyParams = (filters?: any[]) =>
    stringify({ filters: filters || [] });

  const urlSchemeCheck = (url: string) => {
    if (!/^http(s)?/.test(url)) {
      return `http://${url}`;
    }
    return url;
  };

  const openNewTab = (orgId, relId, params?: string) => {
    history.push(`/organizations/${orgId}/vizs/${relId}?${params}`);
  };

  const openBrowserTab = (orgId, relId, params?: string) => {
    window.open(`/organizations/${orgId}/vizs/${relId}?${params}`, '_blank');
  };

  const getDialogContent = (orgId, relId, params?: string) => {
    return {
      width: 1000,
      content: (
        <iframe
          title="Datart Iframe Window"
          height={600}
          width="100%"
          frameBorder="none"
          src={`/organizations/${orgId}/vizs/${relId}?${params}`}
        />
      ),
    };
  };

  const redirectByUrl = (url, params?: string) => {
    window.location.href = `${urlSchemeCheck(url)}?${params}`;
  };

  const openNewByUrl = (url, params?: string) => {
    window.open(`${urlSchemeCheck(url)}?${params}`, '_blank');
  };

  const getDialogContentByUrl = (url, params?: string) => {
    return {
      width: 1000,
      content: (
        <iframe
          title="Datart Iframe Window"
          height={600}
          width="100%"
          frameBorder="none"
          src={`${urlSchemeCheck(url)}?${params}`}
        />
      ),
    };
  };

  return [
    openNewTab,
    openBrowserTab,
    getDialogContent,
    redirectByUrl,
    openNewByUrl,
    getDialogContentByUrl,
  ];
};

export default useDrillThrough;

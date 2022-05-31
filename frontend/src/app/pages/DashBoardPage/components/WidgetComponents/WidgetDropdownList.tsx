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
import { EllipsisOutlined } from '@ant-design/icons';
import { Button, Dropdown, Menu } from 'antd';
import useI18NPrefix from 'app/hooks/useI18NPrefix';
import widgetManager from 'app/pages/DashBoardPage/components/WidgetManager';
import useWidgetAction from 'app/pages/DashBoardPage/hooks/useWidgetAction';
import { useWidgetDropdownList } from 'app/pages/DashBoardPage/hooks/useWidgetDropdownList';
import {
  Widget,
  WidgetActionListItem,
  widgetActionType,
} from 'app/pages/DashBoardPage/types/widgetTypes';
import React, { memo, useCallback, useContext, useMemo } from 'react';
import { BoardContext } from '../BoardProvider/BoardProvider';
import { WidgetChartContext } from '../WidgetProvider/WidgetChartProvider';

export const WidgetDropdownList: React.FC<{
  widget: Widget;
}> = memo(({ widget }) => {
  const { renderMode } = useContext(BoardContext);
  const { supportTrigger } = useContext(WidgetChartContext)!;
  const actions: WidgetActionListItem<widgetActionType>[] =
    widgetManager
      .toolkit(widget.config.originalType)
      .getDropDownList(widget.config, supportTrigger) || [];
  const widgetAction = useWidgetAction();
  const actionList = useWidgetDropdownList(renderMode, actions);
  const t = useI18NPrefix(`viz.widget.action`);
  const menuClick = useCallback(
    ({ key }) => {
      widgetAction(key, widget);
    },
    [widgetAction, widget],
  );

  const dropdownList = useMemo(() => {
    const menuItems = actionList.map(item => {
      return (
        <React.Fragment key={item.key}>
          {item.divider && <Menu.Divider />}
          <Menu.Item
            danger={item.danger}
            icon={item.icon}
            disabled={item.disabled}
            key={item.key}
          >
            {t(item.label || '')}
          </Menu.Item>
        </React.Fragment>
      );
    });

    return <Menu onClick={menuClick}>{menuItems}</Menu>;
  }, [actionList, menuClick, t]);
  if (actionList.length === 0) {
    return null;
  }
  return (
    <Dropdown
      className="widget-tool-dropdown"
      overlay={dropdownList}
      placement="bottomCenter"
      trigger={['click']}
      arrow
    >
      <Button icon={<EllipsisOutlined />} type="link" />
    </Dropdown>
  );
});
(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[744],{67:e=>{"use strict";e.exports=require("node:async_hooks")},195:e=>{"use strict";e.exports=require("node:buffer")},483:(e,t,a)=>{"use strict";a.r(t),a.d(t,{ComponentMod:()=>g,default:()=>f});var s={};a.r(s),a.d(s,{GET:()=>l,runtime:()=>c});var r={};a.r(r),a.d(r,{originalPathname:()=>m,patchFetch:()=>R,requestAsyncStorage:()=>_,routeModule:()=>d,serverHooks:()=>h,staticGenerationAsyncStorage:()=>E});var n=a(663),i=a(514),o=a(860),u=a(113),p=a(808);let c="edge";async function l(){let{env:e}=(0,p.getRequestContext)(),t=e.LINEOA_DB,a=`
    SELECT
      cm.line_user_id,
      MAX(cm.timestamp) AS last_ts,
      (
        SELECT message FROM chat_messages
        WHERE line_user_id = cm.line_user_id
        ORDER BY timestamp DESC
        LIMIT 1
      ) AS last_message
    FROM chat_messages cm
    GROUP BY cm.line_user_id
    ORDER BY last_ts DESC
    LIMIT 100;
  `;return new Response(JSON.stringify((await t.prepare(a).all()).results??[]),{status:200,headers:{"Content-Type":"application/json"}})}let d=new i.AppRouteRouteModule({definition:{kind:o.x.APP_ROUTE,page:"/api/chat/route",pathname:"/api/chat",filename:"route",bundlePath:"app/api/chat/route"},resolvedPagePath:"/workspaces/dawnbagslineoa/app/api/chat/route.tsx",nextConfigOutput:"",userland:s}),{requestAsyncStorage:_,staticGenerationAsyncStorage:E,serverHooks:h}=d,m="/api/chat/route";function R(){return(0,u.XH)({serverHooks:h,staticGenerationAsyncStorage:E})}let g=r,f=n.a.wrap(d)}},e=>{var t=t=>e(e.s=t);e.O(0,[864],()=>t(483));var a=e.O();(_ENTRIES="undefined"==typeof _ENTRIES?{}:_ENTRIES)["middleware_app/api/chat/route"]=a}]);
//# sourceMappingURL=route.js.map
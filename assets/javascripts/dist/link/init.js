/*! weimob_vshop_admin
*author:<a.b.c@hd3p.com> */
define("dist/link/init",["$","dist/application/app","./template/modal.html","./template/fn.html","./template/classes.html","./template/groups.html","./template/goods.html"],function(a,b){"use strict";var c=a("$"),d=a("dist/application/app"),e=d.config,f=d.method,g=a("./template/modal.html"),h=a("./template/fn.html"),i=a("./template/classes.html"),x=a("./template/groups.html"),j=a("./template/goods.html");b.init=function(b,d){function k(b,d,g,k,n){f.post(b,function(b){if(e.issucceed(b)){switch(b.types=n,k){case"fn":g.html(template.compile(h)(b));break;case"classes":g.html(template.compile(i)(b));break;case"groups":g.html(template.compile(x)(b));break;case"goods":b.data.pagelist=l(b.data),g.html(template.compile(j)(b))}var d=c(".js_link_copy_text",document);d.length>0&&a.async("zeroclipboard",function(){ZeroClipboard.setDefaults({moviePath:"/assets/swf/zeroclipboard.swf"}),c.each(d,function(a){var b='<button class="btn btn-default js_link_copy btn-sm" id="{0}" type="button" data-clipboard-target="{2}" data-clipboard-text="{1}">复制链接</button>  <span class="alert copy-success  alert-success hd " style="position: absolute;left: -173px;top:-3px;">复制成功,请粘帖到您需要的地方</span>';c(this).data("icon")&&(b='<i id="{0}" data-clipboard-target="{2}" data-clipboard-text="{1}" class="fa fa-copy js_link_copy"></i><span class="alert copy-success  alert-success hd " style="position: absolute;left: -173px;top:-3px;">复制成功,请粘帖到您需要的地方</span>');var d="copy_button{0}".format(a),e=b,f=c(this),g=f.text().trim(),h=f.attr("id");h?f.after(e.format(d,"",h)):f.append(e.format(d,g));var i=c("#"+d),j=new ZeroClipboard(i),k=function(a){var b=a.nextAll("span.copy-success");b.show(),setTimeout(function(){b.fadeOut()},1e3),setTimeout(function(){c("#ajaxModalLink").modal("hide")},2e3)};j.on("complete",function(a){k(c(a.options.button))})}),m.on("click","button.js_link_copy",function(){var a=c(this),b=a.data("clipboard-text").trim();c.browser.msie?(window.clipboardData.setData("Text",b),success(a)):prompt("按下 Ctrl+C 复制到剪贴板",b)})})}else e.msg.error(b.message)},e.lang.exception,!1,d)}function l(a){var b=[],c=a.totalPage,d=a.currentPage;if(c>0)if(c-d>=2){var e=1,f=5;e=d-2>0?d-2:1,f=e+4;for(var g=e;f>=g;g++)g>0&&c>=g&&b.push(g)}else{var e=1,f=5;f=c>=d+2?d+2:c,e=f-4;for(var g=e;f>=g;g++)g>0&&c>=g&&b.push(g)}return b}c("#ajaxModalLink").remove();var m=c('<div class="modal fade" id="ajaxModalLink"><div class="modal-body "></div></div>');c(document).append(m),m.modal();var n=d.data("path"),o=d.data("type"),p="选择链接";"copy"==o&&(p="复制链接");var q={path:n,types:o,title:p};m.append2(template.compile(g)(q),function(){var a=c("#js_alllink_fun",m);k(n.format("fn"),{},a,"fn",o)}),c('a[data-toggle="tab"]',m).on("show.bs.tab",function(a){var b=c(a.target),d=b.data("id"),e=c("#"+d).find(".js_alllink_list");e.length>0?e.html('<i class="fa fa-spinner fa-spin"></i>'):c("#"+d).html('<i class="fa fa-spinner fa-spin"></i>')}),c('a[data-toggle="tab"]',m).on("shown.bs.tab",function(a){var b=c(a.target),d=b.data("id"),e=b.data("type"),f=c("#"+d).find(".js_alllink_list");f.length>0?k(n.format(e),{},f,e,o):k(n.format(e),{},c("#"+d),e,o)}),m.on("click",".js_alllink_select",function(){var a=c(this),b=a.data("id"),e=a.data("link"),f=a.data("name");d.prev("input[type='text']").val(e),d.prevAll("input[type='hidden']").val(b),d.nextAll("div").html(f).attr("title",f),d.next("input[type='text']").val(f),m.modal("hide")}),m.on("click","footer[data-type='ajaxPage'] a",function(){var a=c(this),b=a.closest("li"),d=b.hasClass("disabled"),e=b.hasClass("active"),f=a.closest("div.tab-pane"),g=(f.attr("id"),f.find("form")),h=g.data("type"),i=g.data("path").format(h),j=c(".js_alllink_page",g),l=f.find(".js_alllink_list"),n=a.data("pageNum");if(i+="&submittype=page",!d&&!e){j.val(n),m.find("footer[data-type='ajaxPage'] li.active").removeClass("active"),b.addClass("active");var p=g.serialize();l.length>0?k(i,p,l,h,o):k(i,p,f,h,o)}}),m.on("click","button[data-type='ajaxSearch']",function(){var a=c(this),b=a.closest("div.tab-pane"),d=a.closest("form"),e=d.data("type"),f=d.data("path").format(e),g=c(".js_alllink_page",d),h=b.find(".js_alllink_list");g.val(1);var i=d.serialize();f+="&submittype=search",h.length>0?k(f,i,h,e,o):k(f,i,b,e,o)})}}),define("dist/link/template/modal.html",[],'<div class="modal-dialog" style="width:680px">\n    <div class="modal-content">\n        <div class="modal-header">\n            <button type="button" class="close" data-dismiss="modal">×</button>\n            <h4 class="modal-title">{{title}}</h4>\n        </div>\n        <div class="modal-body">\n            <section class="panel panel-default" style="margin-bottom:0;">\n                <header class="panel-heading bg-light">\n                    <ul class="nav nav-tabs">\n                        <li class="active">\n                            <a href="#js_alllink_fun" data-id="js_alllink_fun" data-toggle="tab" data-path="{{path}}" data-type="fn">功能链接</a>\n                        </li>\n                        <li>\n                            <a href="#js_alllink_class" data-id="js_alllink_class" data-toggle="tab" data-path="{{path}}" data-type="classes">分类链接</a>\n                        </li>\n                        <li>\n                            <a href="#js_alllink_groups" data-id="js_alllink_groups" data-toggle="tab" data-path="{{path}}" data-type="groups">分组链接</a>\n                        </li>\n                        <li>\n                            <a href="#js_alllink_goods" data-id="js_alllink_goods" data-toggle="tab" data-path="{{path}}" data-type="goods">商品链接</a>\n                        </li>\n                    </ul>\n                </header>\n\n                <div class="panel-body">\n                    <div class="tab-content"> \n                        <div class="tab-pane active" id="js_alllink_fun" data-type="fn" style="overflow-x:hidden">\n                            <i class="fa fa-spinner fa-spin"></i>\n                        </div>\n                        <div class="tab-pane" id="js_alllink_class" data-type="classes" style="overflow-x:hidden">\n                            <i class="fa fa-spinner fa-spin"></i>\n                        </div>\n                        <div class="tab-pane" id="js_alllink_groups" data-type="groups" style="overflow-x:hidden">\n                            <i class="fa fa-spinner fa-spin"></i>\n                        </div>\n                        <div class="tab-pane" id="js_alllink_goods" data-type="goods" style="overflow-x:hidden">\n                            <form class="form-horizontal search-form" data-type="goods" data-path="{{path}}">\n                                <div class="form-group">\n                                    <div class="col-sm-6 col-sm-offset-6">\n                                        <div class="input-group">\n                                            <input type="text" class="input-sm form-control" name="keywords" placeholder="请输入商品名称" value=""/>\n                                            <span class="input-group-btn">\n                                                <button class="btn btn-sm btn-default" data-type="ajaxSearch" type="button" title="搜索">\n                                                    <i class="fa fa-search"></i>\n                                                </button>\n                                            </span>\n                                        </div>\n                                    </div>\n                                </div>\n                                <input type="hidden" name="page" class="js_alllink_page" value="1"/>\n                            </form>\n                            <div class="js_alllink_list">\n                                <i class="fa fa-spinner fa-spin"></i>\n                            </div>\n                            \n                        </div>\n                        \n                    </div>\n                </div>\n            </section>\n            \n        </div>\n        <form class="form-horizontal form-modal" method="post"  novalidate="novalidate">\n            <div class="modal-footer">\n                <input type="hidden" value="12306" name="id">\n                <button type="button" class="btn btn-default" data-dismiss="modal">关闭</button>\n            </div>\n        </form>\n    </div>\n</div>\n'),define("dist/link/template/fn.html",[],'{{if data}}\n    {{each data as item index}}\n        {{if index%2==0}}\n            <div class="row m-t-sm">\n        {{/if}}\n            <div class="col-sm-4 m-t-xs">{{item.name}}</div>\n            <div class="col-sm-2">\n                {{if types=="copy"}}\n                    <span class="js_link_copy_text copy_text m-r">\n                        <span class="hd js_random_result">{{item.url}}</span>\n                    </span>\n                {{else}}\n                    <button type="button" data-id="{{item.id}}" data-name="功能>{{item.name}}" data-link="{{item.url}}" class="btn btn-default btn-sm js_alllink_select">选择链接</button>\n                {{/if}}\n                \n            </div>\n        {{if index%2==1}}\n            </div>\n        {{/if}}\n    {{/each}}\n{{else}}\n    <div class="row m-t-sm text-center">暂无数据</div>\n{{/if}}\n'),define("dist/link/template/classes.html",[],'{{if data}}\n    {{each data as item}}\n        <div class="row m-t-sm">\n            <div class="col-sm-10 m-t-xs">{{item.name}}</div>\n            <div class="col-sm-2">\n                {{if types=="copy"}}\n                    <span class="js_link_copy_text copy_text m-r">\n                        <span class="hd js_random_result">{{item.url}}</span>\n                    </span>\n                {{else}}\n                    <button type="button" data-id="{{item.id}}" data-name="分类>{{item.name}}" data-link="{{item.url}}" class="btn btn-default btn-sm js_alllink_select">选择链接</button>\n                {{/if}}\n            </div>\n        </div>\n        {{each item.child as zitem}}\n            <div class="row m-t-sm">\n                <div class="col-sm-10 m-t-xs"><span class="m-l-lg">{{zitem.name}}</span></div>\n                <div class="col-sm-2">\n                    {{if types=="copy"}}\n                        <span class="js_link_copy_text copy_text m-r">\n                            <span class="hd js_random_result">{{zitem.url}}</span>\n                        </span>\n                    {{else}}\n                        <button type="button" data-id="{{zitem.id}}" data-name="分类>{{item.name}}>{{zitem.name}}" data-link="{{zitem.url}}" class="btn btn-default btn-sm js_alllink_select">选择链接</button>\n                    {{/if}}\n                </div>\n            </div>\n        {{/each}}\n        \n    {{/each}}\n{{else}}\n    <div class="row m-t-sm text-center">暂无数据</div>\n{{/if}}'),


define("dist/link/template/groups.html",[],'{{if data}}\n    {{each data as item}}\n        <div class="row m-t-sm">\n            <div class="col-sm-10 m-t-xs">{{item.name}}</div>\n            <div class="col-sm-2">\n                {{if types=="copy"}}\n                    <span class="js_link_copy_text copy_text m-r">\n                        <span class="hd js_random_result">{{item.url}}</span>\n                    </span>\n                {{else}}\n                    <button type="button" data-id="{{item.id}}" data-name="分组>{{item.name}}" data-link="{{item.url}}" class="btn btn-default btn-sm js_alllink_select">选择链接</button>\n                {{/if}}\n            </div>\n        </div>\n         {{/each}}\n{{else}}\n    <div class="row m-t-sm text-center">暂无数据</div>\n{{/if}}'),


define("dist/link/template/goods.html",[],'\n{{if data.goods}}\n    {{each data.goods as zitem}}\n        <div class="row m-t-sm">\n            <div class="col-sm-10 m-t-xs">\n            <span class="pull-left v-middle"><img class="thumb_img m-r-sm" src="{{zitem.imgsrc}}" style="height: 60px;width:60px;"></span><div class="pull-left m-t-md" style="overflow:hidden;width:400px;height:20px;text-overflow:ellipsis;white-space:nowrap;" title="{{zitem.name}}">{{zitem.name}}</div></div>\n            <div class="col-sm-2 m-t-md">\n                {{if types=="copy"}}\n                    <span class="js_link_copy_text copy_text m-r">\n                        <span class="hd js_random_result">{{zitem.url}}</span>\n                    </span>\n                {{else}}\n                    <button type="button" data-id="{{zitem.id}}" data-name="商品>{{zitem.name}}" data-link="{{zitem.url}}" class="btn btn-default btn-sm js_alllink_select">选择链接</button>\n                {{/if}}\n                \n            </div>\n        </div>\n    {{/each}}\n{{else}}\n    <div class="row m-t-sm text-center">暂无数据</div>\n{{/if}}\n\n{{if data.count>0}}\n<footer class="footer bg-white b-t m-t-sm" data-type="ajaxPage">\n  <div class="row text-center-xs">\n      <div class="col-md-6 hidden-sm">\n          <p class="text-muted m-t">总共{{data.count}}条 当前为第{{data.currentPage}}页</p>\n      </div>\n      <div class="col-md-6 col-sm-12 text-right text-center-xs">\n          <ul class="pagination pagination-sm m-t-sm m-b-none" data-apages-total="{{data.totalPage}}" data-apage-current="{{data.currentPage}}">\n\n            <li {{if data.currentPage==1}} class="disabled"{{/if}}>\n              <a href="javascript:;" rel="first" data-page-num="1"><i class="fa fa-angle-double-left" title="第一页"></i></a>\n            </li>\n            <li {{if data.currentPage==1}} class="disabled"{{/if}}>\n              <a href="javascript:;" rel="prev" data-page-num="{{data.currentPage-1}}"><i class="fa fa-angle-left" title="上一页"></i></a>\n            </li>\n            {{each data.pagelist as item}}\n              <li {{if data.currentPage==item}} class="active"{{/if}}>\n                <a href="javascript:;" data-page-num="{{item}}" data-page-isnum="true">{{item}}</a>\n              </li>\n            {{/each}}\n            <li {{if data.currentPage==data.totalPage}} class="disabled"{{/if}}><a href="javascript:;" rel="next" data-page-num="{{data.currentPage+1}}"><i class="fa fa-angle-right" title="下一页"></i></a></li>\n            <li {{if data.currentPage==data.totalPage}} class="disabled"{{/if}}><a href="javascript:;" rel="last" data-page-num="{{data.totalPage}}"><i class="fa fa-angle-double-right" title="最后页" ></i></a></li>\n          </ul>\n      </div>\n  </div>\n</footer>\n{{/if}}');
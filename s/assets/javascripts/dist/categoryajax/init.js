/*! weimob_vshop_admin
*author:<a.b.c@hd3p.com> */
define("dist/categoryajax/init", ["$", "dist/application/app", "./categoryajax", "./template/categoryajax.html", "./template/ajaxPage.html"],
function(a) {
    "use strict"; {
        var b = (a("$"), a("dist/application/app"));
        b.config
    }
    a("./categoryajax")
}),
define("dist/categoryajax/categoryajax", ["$", "dist/application/app"],
function(a) {
    "use strict";
    function b(a, b) {
        g.post(a,
        function(a) {
            if (f.issucceed(a)) {
                var b = a.data.data,
                c = [],
                e = a.data.totalPage,
                g = a.data.currentPage;
                if (b) {
                    for (var h = 0,
                    l = b.length; l > h; h++) d.inArray(b[h].id, window.freeship_data.goods) > -1 && (b[h].checked = !0);
                    if (e > 0) if (e - g >= 2) {
                        var m = 1,
                        n = 5;
                        m = g - 2 > 0 ? g - 2 : 1,
                        n = m + 4;
                        for (var h = m; n >= h; h++) h > 0 && e >= h && c.push(h)
                    } else {
                        var m = 1,
                        n = 5;
                        n = e >= g + 2 ? g + 2 : e,
                        m = n - 4;
                        for (var h = m; n >= h; h++) h > 0 && e >= h && c.push(h)
                    }
                }
                a.data.pagelist = c;
                var o = template.compile(i + j)(a.data);
                k.html(o)
            } else f.msg.error(a.message)
        },
        f.lang.exception, !1, b)
    }
    function c(a, b, c) {
        if (c) {
            var e = d.inArray(a, b);
            e > -1 && b.splice(e, 1)
        } else {
			b.splice(0,b.length);//清空数组
			b.push(a);
		}
        b.length > 0 ? (m.length > 0 && m.val(window.freeship_data.goods), n.length > 0 && n.html(b.length)) : n.length > 0 && n.html(0)
    }
    var d = a("$"),
    e = a("dist/application/app"),
    f = e.config,
    g = e.method,
    h = d('[data-id="putaway"]'),
    i = a("dist/categoryajax/template/categoryajax.html"),
    j = a("dist/categoryajax/template/ajaxPage.html"),
    k = d("#goods_show"),
    l = d("#putaway form").serialize(),
    m = d("#goods_select_input"),
    n = d(".js_goods_count");
    h.length > 0 && b(h.data("path"), l),
    d('a[data-toggle="tab"]').on("show.bs.tab",
    function() {
        k.html('<i class="fa fa-spinner fa-spin"></i>')
    }),
    d('a[data-toggle="tab"]').on("shown.bs.tab",
    function(a) {
        var c = d(a.target),
        e = c.data("path"),
        f = c.data("id"),
        g = d("#" + f + " form").serialize();
        "selected" == f ? (g += "&ids=" + window.freeship_data.goods, b(e, g)) : b(e, g)
    }),
    d(document).on("click", ".list-goods li",
    function() {
        var a = d(this),
        b = a.hasClass("selected"),
        e = a.hasClass("disabled"),
        f = a.data("id") + "",
        g = d("div.tab-pane.active"),
        h = d(".js_page_goods", g);
        e || (b ? (a.removeClass("selected"), h.prop("checked", !1), c(f, window.freeship_data.goods, !0)) : (d(".list-goods li").removeClass("selected"),a.addClass("selected"), c(f, window.freeship_data.goods, !1)))
    }),
    d(document).on("click", ".js_page_goods",
    function() {
        var a = d(this),
        b = a.prop("checked"),
        e = k.find(".list-goods li");
        e.each(b ?
        function() {
            var a = d(this),
            b = a.data("id") + "",
            e = a.hasClass("disabled");
            e || a.hasClass("selected") || (a.addClass("selected"), c(b, window.freeship_data.goods, !1))
        }: function() {
            var a = d(this),
            b = a.data("id") + "",
            e = a.hasClass("disabled"); ! e && a.hasClass("selected") && (a.removeClass("selected"), c(b, window.freeship_data.goods, !0))
        })
    }),
    d(document).on("click", "button[data-type='order']",
    function() {
        var a = d(this),
        c = a.closest("form"),
        e = d(a.data("order"), c),
        f = d(a.data("orderField"), c),
        g = e.val(),
        h = (f.val(), a.data("field")),
        i = d("button[data-type='order']", c),
        j = i.find("i"),
        k = a.find("i"),
        l = c.data("path"),
        m = d(".js_page_goods", c),
        n = d(".js_page", c);
        switch (i.removeClass("btn-danger"), j.addClass("fa-arrows-v").removeClass("fa-long-arrow-down fa-long-arrow-up"), f.val(h), n.val(1), m.prop("checked", !1), a.addClass("btn-danger"), g) {
        case "desc":
            e.val("asc"),
            k.addClass("fa-long-arrow-up").removeClass("fa-arrows-v");
            break;
        case "asc":
            e.val("desc"),
            k.addClass("fa-long-arrow-down").removeClass("fa-arrows-v");
            break;
        default:
            e.val("desc"),
            k.addClass("fa-long-arrow-down").removeClass("fa-arrows-v")
        }
        var o = c.serialize();
        b(l, o)
    }),
    d(document).on("click", "button[data-type='ajaxSearch']",
    function() {
        var a = d(this),
        c = a.closest("form"),
        e = c.data("path"),
        f = d(".js_page_goods", c),
        g = d(".js_page", c);
        g.val(1),
        f.prop("checked", !1);
        var h = c.serialize();
        b(e, h)
    }),
    d(document).on("change", "select[data-type='ajaxSelectSearch']",
    function() {
        var a = d(this),
        c = a.closest("form"),
        e = c.data("path"),
        f = d(".js_page_goods", c),
        g = d(".js_page", c);
        g.val(1),
        f.prop("checked", !1);
        var h = c.serialize();
        b(e, h)
    }),
    d(document).on("click", "footer[data-type='ajaxPage'] a",
    function() {
        var a = d(this),
        c = a.closest("li"),
        e = c.hasClass("disabled"),
        f = c.hasClass("active"),
        g = d("div.tab-pane.active"),
        h = g.attr("id"),
        i = g.find("form"),
        j = i.data("path"),
        k = d(".js_page_goods", i),
        l = d(".js_page", i),
        m = a.data("pageNum");
        if (!e && !f) {
            l.val(m),
            d("footer[data-type='ajaxPage'] li.active").removeClass("active"),
            c.addClass("active"),
            k.prop("checked", !1);
            var n = i.serialize();
            "selected" == h && (n += "&ids=" + window.freeship_data.goods),
            b(j, n)
        }
    }),
    d(document).on("click", ".js_goods_submit_btn",
    function() {
        return m.length > 0 && m.val().length < 1 ? (f.msg.error("请选择类别"), !1) : void 0
    }),
    d(document).on("keypress",
    function(a) {
        var a = a || event,
        b = a.keyCode || a.which || a.charCode;
        return 13 == b ? (d("div.tab-pane.active button[data-type='ajaxSearch']").trigger("click"), !1) : void 0
    })
}),
define("dist/categoryajax/template/categoryajax.html", [], '{{if data}}\n  <ul class="list-goods list-unstyled clearfix">\n  {{each data as item}}\n    <li data-id="{{item.id}}" class="{{if item.checked}}selected{{/if}}  {{if item.store==0}}disabled{{/if}}" >\n        <div class="pull-left">\n          <img src="{{item.img}}">\n        </div>\n        <div class="pull-left m-t">\n          <div class="goods-name" title="{{item.name}}">{{item.name}}</div>\n          <div class="goods-label">\n            {{each item.label as text}}\n              <span class="label label-danger">{{text}}</span>\n            {{/each}}\n          </div>\n          <div class="clearfix">\n            <div class="pull-left goods-count">排序：{{item.sort}}</div>\n          </div>\n        </div>\n        <span class="selected-sign"></span>\n    </li>\n  {{/each}}\n \n  </ul>\n{{else}}\n<div>暂无数据</div>\n{{/if}}\n\n'),
define("dist/categoryajax/template/ajaxPage.html", [], '{{if count>0}}\n<footer class="footer bg-white b-t" data-type="ajaxPage">\n  <div class="row text-center-xs">\n      <div class="col-md-6 hidden-sm">\n          <p class="text-muted m-t">总共{{count}}条 当前为第{{currentPage}}页</p>\n      </div>\n      <div class="col-md-6 col-sm-12 text-right text-center-xs">\n          <ul class="pagination pagination-sm m-t-sm m-b-none" data-apages-total="{{totalPage}}" data-apage-current="{{currentPage}}">\n\n            <li {{if currentPage==1}} class="disabled"{{/if}}>\n              <a href="javascript:;" rel="first" data-page-num="1"><i class="fa fa-angle-double-left" title="第一页"></i></a>\n            </li>\n            <li {{if currentPage==1}} class="disabled"{{/if}}>\n              <a href="javascript:;" rel="prev" data-page-num="{{currentPage-1}}"><i class="fa fa-angle-left" title="上一页"></i></a>\n            </li>\n            {{each pagelist as item}}\n              <li {{if currentPage==item}} class="active"{{/if}}>\n                <a href="javascript:;" data-page-num="{{item}}" data-page-isnum="true">{{item}}</a>\n              </li>\n            {{/each}}\n            <li {{if currentPage==totalPage}} class="disabled"{{/if}}><a href="javascript:;" rel="next" data-page-num="{{currentPage+1}}"><i class="fa fa-angle-right" title="下一页"></i></a></li>\n            <li {{if currentPage==totalPage}} class="disabled"{{/if}}><a href="javascript:;" rel="last" data-page-num="{{totalPage}}"><i class="fa fa-angle-double-right" title="最后页" ></i></a></li>\n          </ul>\n      </div>\n  </div>\n</footer>\n{{/if}}');
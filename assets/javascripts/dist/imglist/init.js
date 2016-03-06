/*! weimob_vshop_admin
 *author:<a.b.c@hd3p.com> */
define("dist/imglist/init", ["$", "dist/application/app", "./delivery", "./courier", "event_drag", "row_sizing", "./template/item.html"], function(a) {
	"use strict"; {
		var b = (a("$"), a("dist/application/app"));
		b.config
	}
	a("./delivery"), a("./courier")
}), define("dist/imglist/delivery", ["$", "dist/application/app"], function(a) {
	"use strict";
	var b = a("$"),
		c = a("dist/application/app"),
		d = c.config,
		e = b('[data-toggle="delivery"]');
	if (e.length > 0) {
		var f = b('[data-toggle="valuation"]:checked'),
			g = b('[data-toggle="delivery_list"]'),
			h = function() {
				this.way = null, f.length > 0 && (this.way = f.data("type")), this.init()
			};
		h.prototype = {
			init: function() {
				var a = this;
				e.on("click", function() {
					var c = {},
						d = b(this);
					c.delivery = d.data("delivery"), c.valuation = a.valuation(), c.custom = null, c.name = d.data("name"), c.normal = {
						delivery: c.delivery,
						valid: b('[data-toggle="valuation"]:checked').data("valid"),
						index: 0
					};
					var e = b("#delivery_item_" + c.delivery);
					if (this.checked) {
						a.createTable(c)
					} else e.hide()
				}), b(document).on("click", ".js_add_area", function() {
					var c = b(this),
						d = c.closest("div.panel"),
						e = b("table:first", d),
						f = b("tbody tr", d).length,
						g = d.data("delivery"),
						h = {
							area: "<span class='js_no_area'> 未指定地区</span>"
						};
					h.normal = {
						delivery: g,
						index: f
					}, a.createCustom(e, h)
				}), b('[data-toggle="valuation"]').on("click", function(c) {
					var f = b(this),
						h = function() {
							f.prop("checked", !0), g.empty(), e.prop("checked", !1), a.way = f.data("type")
						},
						i = function() {
							c && c.preventDefault(), a.way != f.data("type") && d.msg.msgbox.confirm(d.lang.confirmChangedelivery, function(a) {
								a && h()
							})
						},
						j = 0 == g.find("table").length;
					j ? h() : i()
				})
			},
			createTable: function(a) {
				var c = "#delivery_item_" + a.delivery,
					d = b(c);
				return d.length > 0 ? d.show() : g.append(template("delivery_setting_tpl", a)), b(c).closest("div.panel")
			},
			createCustom: function(a, b) {
				a.append(template("delivery_area_tpl", b))
			},
			valuation: function() {
				return b('[data-toggle="valuation"]:checked').data()
			}
		}, new h, b('form button[type="submit"]').on("click", function() {
			return 0 == b('[data-toggle="delivery"]:checked').length ? (d.msg.info("至少选择一个分类！"), !1) : void 0
		})
	}
}), define("dist/imglist/courier", ["$", "dist/application/app", "event_drag", "row_sizing"], function(a) {
	"use strict";
	var b = a("$"),
		c = a("dist/application/app"),
		d = c.config;
	a("event_drag"), a("row_sizing");
	var e = b("select.js_sys_templet");
	if (e.length > 0) {
		b("select.js_sys_templet").on("change", function() {
			var a = b(this).val();
			d.msg.msgbox.confirm(d.lang.confirmChangetemplet, function(b) {
				b && d.msg.redirect(a)
			})
		});
		var f = b(".js_container"),
			g = 1,
			h = b("#background"),
			i = b("#width"),
			j = b("#height"),
			k = a("dist/imglist/template/item.html");
		b(".js_print_item").on("click", function() {
			var a = b(this),
				c = (a.val(), a.attr("id")),
				d = a.prop("checked"),
				e = b("#" + "item_{0}".format(c));
			$("#show_print_item" + a.val()).toggle();
			if (d) {
				if (0 == e.length) {
					var g = b(k.format(a.data("text"), c));
					g.attr("id", "item_{0}".format(c)), l(g.appendTo(f))
				}
			} else e.remove()
		});
		var l = function(a) {

/******************  旋转 缩放 拖动 ********************************/
		
				b('<div class="rotation"></div>').appendTo(a);

				a.drag("start", function(a, c) {
					var d = b(this);

					c.width = d.width(), 
					c.height = d.height(), 
					c.limit = {
						right: f.innerWidth() - d.outerWidth(),
						bottom: f.innerHeight() - d.outerHeight()
					}, 
					c.position = [parseFloat(d.css('left')),parseFloat(d.css('top'))],
					c.isResize = b(a.target).hasClass("resize"),
					c.isRotation = b(a.target).hasClass("rotation");

					c.r = d.data('rotate') || 0;
					var du = c.r*Math.PI/180;

					c.center = [c.startX + 0.5*c.width * Math.cos(du) + 0.5*c.height *  Math.sin(du),
								c.startY + 0.5*c.width * Math.sin(du) + 0.5*c.height *  Math.cos(du)];
					

				}).drag(function(a, c) {
					var d = b(this);

					// 改变大小[自己改吧，根据旋转角度，更改css的left属性和width]
					if(c.isResize){
						d.css({
							width: Math.max(20, Math.min(c.width + c.deltaX, f.innerWidth() - d.position().left) - 2),
							height: Math.max(20, Math.min(c.height + c.deltaY, f.innerHeight() - d.position().top) - 2)
						}).find("textarea").blur();

					}else if(c.isRotation){ // 旋转


						var start = [c.startX,c.startY];
						var stop = [c.deltaX + c.startX , c.deltaY + c.startY];

						var r1 = Math.atan2(start[1] - c.center[1],start[0] - c.center[0])*180/Math.PI;
						var r2 = Math.atan2(stop[1] - c.center[1],stop[0] - c.center[0])*180/Math.PI;
						
						var rotate = r2 - r1 + c.r;
						d.data('rotate',rotate);

						d.css('transform','rotate('+rotate+'deg)');


					}else{ // 拖动
						d.css({
							top: Math.min(c.limit.bottom, Math.max(0, c.deltaY + c.position[1])),
							left: Math.min(c.limit.right, Math.max(0, c.deltaX + c.position[0]))
						})
					}

				}, {
					relative: !0
				}).mousedown(function() {
					b(this).css("z-index", g++)
				}).click(function() {
					var a = b(this);
					f.find("div.item").not(a).removeClass("selected"), a.toggleClass("selected")
				});



/**************************************************/


			},
			m = b(".item", f);
		m.length > 0 && function() {
			b.each(m, function() {
				l(b(this))
			})
		}(), b('[data-toggle="selectimg"]').bind("insert", function(a, c) {
			b(".jsimg").attr("src", c).show()
		}), h.on("change", function() {
			f.css({
				background: "url(" + h.val() + ") 0px 0px no-repeat"
			})
		});
		var n = function() {};
		i.add(j).on("change", function() {
			n()
		}), b(document).on("click", "div.js_container .close", function() {
			var a = b(this).closest(".item");
			$("#show_" + a.data("id")).toggle();
			a.remove(), b("#" + a.data("id")).prop("checked", !1)
		}), b('form button[type="submit"]').on("click", function() {
			if (0 == b("input.js_print_item:checked").length) return d.msg.info("显示项未勾选或位置设置不正确！"), !1;
			var a = b("<div>{0}</div>".format(f.html()));
			b(".close", a).remove();
			var c = b("div.item", a);
			return b.each(c, function(a, c) {
				var d = b(c);
				b("pre", d).text(b("#" + d.data("id")).data("value"))
			}), a.find(".close").remove(), b("#content").val(a.html().trim()), n()
		})
	}
}), define("dist/imglist/template/item.html", [], '<div class="item" style="width: 171px; height: 41px;" data-id="{1}">\n<a  href="javascript:;" class="close" >&times;</a><pre>{0}</pre><div class="resize"></div></div>');
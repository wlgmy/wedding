#enconding=utf8
import tornado.ioloop
import tornado.httpserver
import json
import tornado.web
import pymongo as mo

from tornado.options import define, options

define("port", default=8000, help="run on the given port", type=int)
connection=mo.MongoClient("112.124.11.214",27017)
db=connection["wedding"]
db.authenticate("wedding","wedding123")

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', tornado!')

application = tornado.web.Application([
    (r"/", IndexHandler),
])


if __name__ == "__main__":
    tornado.options.parse_command_line()
    application.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()
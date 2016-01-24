#enconding=utf8
import tornado.ioloop
import tornado.httpserver
import json
import tornado.web
import pymongo as mo
import logging,signal
import time,os

from tornado.options import define, options

define("port", default=8000, help="run on the given port", type=int)
define('service', default="", help="Server name", type=str)
MAX_WAIT_SECONDS_BEFORE_SHUTDOWN = 1
server = None

connection=mo.MongoClient("112.124.11.214",27017)
db=connection["wedding"]
db.authenticate("wedding","wedding123")

def sig_handler(sig, frame):
    logging.warning('Caught Signal: %s', sig)
    tornado.ioloop.IOLoop.instance().add_callback(shutdown)

def shutdown():
    """shutdown """
    global server
    logging.info('Stopping HttpServer..')
    server.stop()
    
    logging.info('IOLoop Will be Terminate in %s Seconds...', MAX_WAIT_SECONDS_BEFORE_SHUTDOWN)
    instance = tornado.ioloop.IOLoop.instance()
    deadline = time.time() + MAX_WAIT_SECONDS_BEFORE_SHUTDOWN
    
    def terminate():
        now = time.time()
        if now < deadline and (instance._callbacks or instance._timeouts):
            instance.add_timeout(now + 1, terminate)
        else:
            instance.stop()
            logging.info('Shutdown...')

    terminate()   


#class IndexHandler(tornado.web.RequestHandler):

class IndexHandler(tornado.web.RequestHandler):
    def get(self):
        greeting = self.get_argument('greeting', 'Hello')
        self.write(greeting + ', tornado!')

def wedding(port, start_ioloop=True):
    """
    Run server on the specified port. If start_ioloop is True (default),
    the tornado IOLoop will be started immediately.
    """
    global server
    app = tornado.web.Application([
        (r"/", IndexHandler),
    ])

    #app.config = config
    server = tornado.httpserver.HTTPServer(app, xheaders=True)
    server.bind(port)
    
    # signal register
    signal.signal(signal.SIGINT, sig_handler)
    signal.signal(signal.SIGTERM, sig_handler)

    server.start()
    ioloop = tornado.ioloop.IOLoop.instance()
    if start_ioloop:
        ioloop.start()


if __name__ == "__main__":
    tornado.options.parse_command_line()
    logging.info("Starting Tornado service on port %d" % options.port)
    wedding(options.port)
    #tornado.ioloop.IOLoop.instance().start()
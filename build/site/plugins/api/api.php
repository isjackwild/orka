<?php


kirby()->set('route', array(
    'pattern' => 'api/initial-data',
    'action'  => function() {
        $title = (string) site()->title()->value();
        $description = (string) site()->description()->value();
        $about = (string) page('about')->text()->kt();
        
        $contactPage = page('contact');
        $contact = (object) [
          'instagram' => $contactPage->instagram()->isNotEmpty() ? (string) $contactPage->instagram()->url() : null,
          'twitter' => $contactPage->twitter()->isNotEmpty() ? (string) $contactPage->twitter()->url() : null,
          'facebook' => $contactPage->facebook()->isNotEmpty() ? (string) $contactPage->facebook()->url() : null,
        ];

        // $json = array();
        $json = (object) [
          'title' => $title,
          'description' => $description,
          'about' => (string) $about,
          'contact' => $contact,
        ];

        if (site()->homePage()) {
          return response::json(json_encode($json));
        } else {
          return response::error($message = '404 Not found', $code = 404, $data = array($section));
        }
    }
));

kirby()->set('route', array(
    'pattern' => array('(:any)', '(:any)/(:any)'),
    'action'  => function() {
      return page('home');
    },
));


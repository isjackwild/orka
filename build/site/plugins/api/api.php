<?php

function generate_feed_json() {
  $pages = page('feed')->children()->visible();
  $items = array();

  foreach($pages as $page) {
    $item = array();
    $item['title'] = $page->title()->value();
    $item['type'] = $page->intendedTemplate();

    switch ($page->intendedTemplate()) {
      case 'feed--live':
        $item['date'] = $page->show_date()->value();
        $item['link'] = $page->tickets()->isNotEmpty() ? (string) $page->tickets()->url() : null;
        break;
      case 'feed--news':
        $item['text'] = (string) $page->text()->kt();
        break;
      case 'feed--shop':
        $item['link'] = (string) $page->shop_link()->url();
        break;
      case 'feed--video':
        $item['text'] = $page->text()->isNotEmpty() ? (string) $page->text()->kt() : null;
        break;
      default:
        break;
    }

    array_push($items, (object) $item);
  }

  
  $json = (object) [
    'items' => $items,
  ];

  return $json;
}

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

        $json = (object) [
          'title' => $title,
          'description' => $description,
          'about' => (string) $about,
          'contact' => $contact,
          'feed' => generate_feed_json(),
        ];

        if (site()->homePage()) {
          return response::json(json_encode($json));
        } else {
          return response::error($message = '404 Not found', $code = 404, $data = array($section));
        }
    }
));

kirby()->set('route', array(
    'pattern' => 'api/feed-items',
    'action'  => function() {
        return response::json(json_encode(generate_feed_json()));
    }
));

kirby()->set('route', array(
    'pattern' => array('(:any)', '(:any)/(:any)'),
    'action'  => function() {
      return page('home');
    },
));

